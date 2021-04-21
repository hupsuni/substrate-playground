#![feature(async_closure, proc_macro_hygiene, decl_macro)]

mod api;
mod error;
mod github;
mod kubernetes;
mod manager;
mod metrics;
mod prometheus;
mod types;

use crate::manager::Manager;
use crate::prometheus::PrometheusMetrics;
use ::prometheus::Registry;
use github::GitHubUser;
use rocket::fairing::AdHoc;
use rocket::{catchers, config::Environment, http::Method, routes};
use rocket_cors::{AllowedOrigins, CorsOptions};
use rocket_oauth2::{HyperSyncRustlsAdapter, OAuth2, OAuthConfig, StaticProvider};
use std::{env, error::Error};

pub struct Context {
    manager: Manager,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    // Initialize log configuration. Reads `RUST_LOG` if any, otherwise fallsback to `default`
    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "info");
    }
    env_logger::init();

    // Prints basic details
    log::info!("Running ROCKET in {:?} mode", Environment::active()?);

    match env::var("GITHUB_SHA") {
        Ok(version) => log::info!("Version {}", version),
        Err(_) => log::warn!("Unknown version"),
    }

    let manager = Manager::new().await?;
    let engine = manager.clone().engine;
    manager.clone().spawn_background_thread();

    // Configure CORS
    let cors = CorsOptions {
        allowed_origins: AllowedOrigins::all(),
        allowed_methods: vec![Method::Get, Method::Post, Method::Put, Method::Delete]
            .into_iter()
            .map(From::from)
            .collect(),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()?;

    let registry = Registry::new_custom(Some("playground".to_string()), None)?;
    manager.clone().metrics.register(registry.clone())?;
    let prometheus = PrometheusMetrics::with_registry(registry);
    let error = rocket::ignite()
        .register(catchers![api::bad_request_catcher])
        .attach(cors)
        .attach(AdHoc::on_attach("github", |rocket| {
            let config = OAuthConfig::new(
                StaticProvider {
                    auth_uri: "https://github.com/login/oauth/authorize".into(),
                    token_uri: "https://github.com/login/oauth/access_token".into(),
                },
                engine.configuration.github_client_id,
                engine.secrets.github_client_secret,
                None,
            );
            Ok(rocket.attach(OAuth2::<GitHubUser>::custom(
                HyperSyncRustlsAdapter::default().basic_auth(false),
                config,
            )))
        }))
        .mount(
            "/api",
            routes![
                api::get,
                api::get_unlogged,
                // Users
                api::get_user,
                api::list_users,
                api::create_user,
                api::update_user,
                api::delete_user,
                // Current Session
                api::get_current_session,
                api::get_current_session_unlogged,
                api::create_current_session,
                api::create_current_session_unlogged,
                api::update_current_session,
                api::update_current_session_unlogged,
                api::delete_current_session,
                api::delete_current_session_unlogged,
                // Sessions
                api::get_session,
                api::list_sessions,
                api::create_session,
                api::update_session,
                api::delete_session,
                // Templates
                api::list_templates,
                // Pools
                api::get_pool,
                api::list_pools,
                // Login
                api::github_login,
                api::post_install_callback,
                api::login,
                api::logout,
            ],
        )
        .mount("/metrics", prometheus)
        .manage(Context { manager })
        .launch();

    // Launch blocks unless an error is returned
    Err(error.into())
}
