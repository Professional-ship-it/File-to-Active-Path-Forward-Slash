// Command Handler //

// Version 0.0.2//
import * as vscode from 'vscode';
import { getRelPath } from '../commands/relPath';
import { Logger } from '../utils/Logger';

/**
 * Copies the relative path from the workspace root to the active file.
 * Handles missing editors, missing workspaces, and copy errors gracefully.
 */
export async function copyActiveRelPath(): Promise<void> {
    try {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            Logger.error('No active editor found.', { context: 'copyActiveRelPath'});
            
            return;
        }

        const activePath = editor.document.uri.fsPath;

        if (!activePath) {
            Logger.error('Active editor has no file path.', { context: 'copyActiveRelPath' });
            
            // vscode.window.showErrorMessage('Could not determine active file path.');
            
            return;
        }

        const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
        if (!workspaceFolder) {
            Logger.error('Active file is not within a workspace.', { context: 'copyActiveRelPath', activePath });

            // vscode.window.showErrorMessage(
            //     'This file is not part of any workspace. Relative path cannot be calculated.'
            // );
            
            return;
        }

        const workspacePath = workspaceFolder.uri.fsPath;
        const rel = getRelPath(workspacePath, activePath);

        // Type-Safety for fix for potential null return
        if (!rel) {
            Logger.error('Relative path calculation failed.', { workspacePath, activePath });
            
            // vscode.window.showErrorMessage('Failed to calculate relative path. See console for details.');
            
            return;
        }

        await vscode.env.clipboard.writeText(rel);
        //Improved information logging with user context
        Logger.info('Copied relative path to clipboard.', { relativePath: rel});
        
        vscode.window.setStatusBarMessage(`📋 Copied: ${rel}`, 2500 );
        
        // vscode.window.showInformationMessage(`Copied relative path: ${rel}`);

    } catch (error) {
        Logger.error('Unexpected error copying relative path.', { context: 'copyActiveRelPath', error });
        
        // vscode.window.showErrorMessage('Unexpected error copying relative path. See console for details.');
        // console.error('[copyActiveRelPath] Exception:', error);
    }
}
// Version: 0.0.1 //
// import * as vscode from 'vscode';
// import { computeRelativePath } from '../relPath';

// export async function copyRelativePath(fileUri?: vscode.Uri) {
//     const editor = vscode.window.activeTextEditor;
//     const activeUri = editor?.document.uri;

//     const targetUri = fileUri ?? activeUri;
//     if (!targetUri) {
//         vscode.window.showErrorMessage('No file selected and no active editor. Select a file or open an editor.');
//         return;
//     }
    
//     const relativePath = computeRelativePath(activeUri?.fsPath ?? targetUri.fsPath, targetUri.fsPath);
// }

// Version: 0.0.0 //
//     try {
//     const activeUri = editor.document.uri; 
    
//     try {
//         const relativePath = computeRelativePath(activeUri.fsPath, fileUri.fsPath);
//         await vscode.env.clipboard.writeText(relativePath);
//         vscode.window.showInformationMessage(`Copied relative path: ${relativePath}`);
   
//     } catch (error) {
//         vscode.window.showErrorMessage(`Error copying relative path: ${error}`);
//     }
// }