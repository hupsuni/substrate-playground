
/**
 * Generated using theia-plugin-generator
 */

import * as theia from '@theia/plugin';
import { v4 } from 'uuid';

export function start(context: theia.PluginContext) {
    const sessions: theia.AuthenticationSession[] = context.workspaceState.get('sessions') || [];
    const onDidChangeSessions = new theia.EventEmitter<theia.AuthenticationProviderAuthenticationSessionsChangeEvent>();
    theia.authentication.registerAuthenticationProvider({
        id: 'github',
        label: 'GitHub',
        supportsMultipleAccounts: false,
        onDidChangeSessions: onDidChangeSessions.event,
        getSessions: async () => sessions,
        login: async (scopeList: string[]) => {
            const session = {
                id: v4(),
                accessToken: 'paste the github token here',
                account: { label: 'githubUser', id: 'githubUserId' },
                scopes: scopeList
            };
            const sessionIndex = sessions.findIndex(s => s.id === session.id);
            if (sessionIndex > -1) {
                sessions.splice(sessionIndex, 1, session);
            } else {
                sessions.push(session);
            }
            context.workspaceState.update('sessions', sessions);
            onDidChangeSessions.fire({ added: [session.id], removed: [], changed: [] });
            return session;
        },
        logout: async (id: string) => {
            const sessionIndex = sessions.findIndex(session => session.id === id);
            if (sessionIndex > -1) {
                sessions.splice(sessionIndex, 1);
                context.workspaceState.update('sessions', sessions);
                onDidChangeSessions.fire({ added: [], removed: [id], changed: [] });
            }
        }
    }
    );

}

export function stop() {

}
