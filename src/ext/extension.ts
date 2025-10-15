import * as vscode from 'vscode';
import {registerLoggerCommands} from './Logger_Commands';
import { copyActiveRelPath } from '../commands/copyRelPath';

export function activate(context: vscode.ExtensionContext) {
    // register log command
    registerLoggerCommands(context);
    const cmd = vscode.commands.registerCommand(
        'extension.copyRelativePathForwardSlash',
        copyActiveRelPath
    );
    context.subscriptions.push(cmd);

    vscode.window.showInformationMessage('Extension "File to Active Path Forward Slash" activated successfully.');
}

export function deactivate() {}