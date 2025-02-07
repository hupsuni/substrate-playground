import { assign, createMachine, StateMachine, StateSchema } from 'xstate';
import { Client, Configuration, LoggedUser, Template } from '@substrate/playground-client';
import { approve, approved } from './terms';

export enum PanelId {Workspace, Admin, Stats, Theia}

export interface Context {
  panel: PanelId,
  templates: Record<string, Template>,
  error?: string,
}

export enum Events {
    TERMS_APPROVAL = '@event/TERMS_APPROVAL',
    LOGIN = '@action/LOGIN',
    SELECT = '@action/SELECT',
    RESTART = '@action/RESTART',
    UNLOGIN = '@action/UNLOGIN',
    LOGOUT = '@action/LOGOUT',
}

export enum Actions {
    STORE_TERMS_HASH = '@action/STORE_TERMS_HASH',
}

export type Event =
  | { type: Events.TERMS_APPROVAL; id: string }
  | { type: Events.LOGIN; user: LoggedUser; conf: Configuration }
  | { type: Events.SELECT; panel: PanelId }
  | { type: Events.RESTART; }
  | { type: Events.UNLOGIN; conf?: Configuration; error?: string }
  | { type: Events.LOGOUT; };


export enum States {
    TERMS_UNAPPROVED = '@state/TERMS_UNAPPROVED',
    SETUP = '@state/SETUP',
    LOGGED = '@state/LOGGED',
    UNLOGGED = '@state/UNLOGGED',
    UNLOGGING = '@state/UNLOGGING',
}

export type Typestate =
  | {
      value: States.SETUP;
      context: Context;
    }
  | {
      value: States.TERMS_UNAPPROVED;
      context: Context;
    }
  | {
      value: States.LOGGED;
      context: Context & {  user: LoggedUser, conf: Configuration };
    }
  | {
      value: States.UNLOGGED;
      context: Context;
    }
  | {
      value: States.UNLOGGING;
      context: Context;
     };

export interface SchemaType extends StateSchema {
    states: {
        [States.TERMS_UNAPPROVED]: Record<string, unknown>;
        [States.SETUP]: Record<string, unknown>;
        [States.LOGGED]: Record<string, unknown>;
        [States.UNLOGGED]: Record<string, unknown>;
        [States.UNLOGGING]: Record<string, unknown>;
    };
}

export function newMachine(client: Client, id: PanelId): StateMachine<Context, SchemaType, Event, Typestate> {
  return createMachine<Context, Event, Typestate>({
    initial: approved()? States.SETUP: States.TERMS_UNAPPROVED,
    context: {
        panel: id,
        templates: {},
    },
    states: {
        [States.TERMS_UNAPPROVED]: {
            on: {
                [Events.TERMS_APPROVAL]:
                    {target: States.SETUP,
                     actions: [Actions.STORE_TERMS_HASH]},
            }
        },
        [States.SETUP]: {
            invoke: {
                src: () => async (callback) => {
                    try {
                        const { configuration, templates, user } = (await client.get());
                        if (user) {
                            callback({type: Events.LOGIN, user: user, templates: templates, conf: configuration});
                        } else {
                            callback({type: Events.UNLOGIN, templates: templates, conf: configuration});
                        }
                    } catch (e) {
                        const error = e.message || JSON.stringify(e);
                        callback({type: Events.UNLOGIN, error: error});
                    }
                },
            },
            on: {[Events.LOGIN]: {target: States.LOGGED,
                                  actions: assign((_, event) => {
                                    return {
                                      user: event.user,
                                      conf: event.conf,
                                      templates: event.templates,
                                      error: undefined,
                                    }
                                  })},
                 [Events.UNLOGIN]: {target: States.UNLOGGED,
                                    actions: assign((_, event) => {
                                      return {
                                        templates: event.templates,
                                        conf: event.conf,
                                        error: event.error,
                                      }
                                    })}}
        },
        [States.UNLOGGED]: {
            on: {[Events.RESTART]: States.SETUP,}
        },
        [States.LOGGED]: {
            on: {[Events.RESTART]: States.SETUP,
                 [Events.LOGOUT]: {target: States.UNLOGGING},
                 [Events.SELECT]: {actions: assign({ panel: (_, event) => event.panel})}}
        },
        [States.UNLOGGING]: {
            invoke: {
                src: async () => {
                    await client.logout();
                },
                onDone: {target: States.SETUP}
            }
        },
    }
  },
  {
    actions: {
      [Actions.STORE_TERMS_HASH]: () => {
        approve();
      },
    }
  });
}
