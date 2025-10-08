import * as vscode from 'vscode';
import { copyRelativePath } from './commands/copyRelPath';

export function activate(context: vscode.ExtensionContext) {
    const cmd = vscode.commands.registerCommand(
    'extension.copyRelativePath', copyRelativePath
);
    context.subscriptions.push(cmd);
}

export function deactivate() {}