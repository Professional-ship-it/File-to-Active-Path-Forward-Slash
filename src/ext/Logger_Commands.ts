// Declares and registers commands related to Logger settings
// src/ext/Logger_Commands.ts
import * as vscode from 'vscode';
import { Logger } from '../utils/Logger';

/**
 * Registers the "logger_Level" command to change log verbosity at runtime.
 */
export function registerLoggerCommands(context: vscode.ExtensionContext) {
    const cmd = vscode.commands.registerCommand('logger_Level', async () => {
        const options: vscode.QuickPickItem[] = [
            { label: 'info', description: 'Show all logs' },
            { label: 'warn', description: 'Show warnings and errors' },
            { label: 'error', description: 'Show only errors' },
        ];

        const selection = await vscode.window.showQuickPick(options, {
            placeHolder: 'Select log level',
        });

        if (selection) {
            Logger.setLogLevel(selection.label as 'info' | 'warn' | 'error');
            Logger.info(`Log level set to ${selection.label.toUpperCase()}`);
            vscode.window.showInformationMessage(`Logger level set to: ${selection.label}`);
        }
    });
    context.subscriptions.push(cmd);
}


// import * as vscode from 'vscode';
// import { Logger } from '../utils/Logger';

// vscode.commands.registerCommand(
//     'logger_Level',
//     async () => {
//         const options: vscode.QuickPickItem[] = [
//             { label: 'info', description: 'Show all logs' },
//             { label: 'warn', description: 'Show warnings and errors' },
//             { label: 'error', description: 'Show only errors' },
//         ];
//         const selection = await vscode.window.showQuickPick(options, {
//             placeHolder: 'Select log level',
//         });
//         if (selection) {
//             // Update log level in Logger
//             (Logger as any).setLogLevel(selection.label as 'info' | 'warn' | 'error');
//             Logger.info(`Log level set to ${selection.label}`);
//         }
//         return;
//     }
// );