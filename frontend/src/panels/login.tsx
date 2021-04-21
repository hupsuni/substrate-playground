import React from "react";
import Button from "@material-ui/core/Button";
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import { Client } from "@substrate/playground-client";
import { CenteredContainer } from "../components";

function login(client: Client): void {
    window.location.href = client.loginPath();
}

export function LoginPanel({ client }: { client: Client }): JSX.Element {
    return (
        <CenteredContainer>
            <Typography variant="h3" style= {{ textAlign: "center" }}>
                You must log in to use Playground
            </Typography>
            <Button style={{ marginTop: 40 }} startIcon={<GitHubIcon />} onClick={() => login(client)} color="primary" variant="contained" disableElevation>LOGIN</Button>
        </CenteredContainer>
    );
}
