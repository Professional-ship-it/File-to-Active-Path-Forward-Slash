// Command Handler //
import * as vscode from 'vscode';
import { computeRelativePath } from '../relPath';

export async function copyRelativePath(fileUri: vscode.Uri) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor. Select a file first to copy its relative path.');
        return;
    }
    
    const activeUri = editor.document.uri; 
    
    try {
        const relativePath = computeRelativePath(activeUri.fsPath, fileUri.fsPath);
        await vscode.env.clipboard.writeText(relativePath);
        vscode.window.showInformationMessage(`Copied relative path: ${relativePath}`);
   
    } catch (error) {
        vscode.window.showErrorMessage(`Error copying relative path: ${error}`);
    }
}