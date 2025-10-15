// modular path for logic //
import * as path from 'path';
import * as vscode from 'vscode';
import { Logger } from '../utils/Logger';

/**
 * Calculates a normalized relative path from `from` to `to`.
 * Defensively checks for invalid or missing paths.
 */
export function getRelPath(from: string | undefined, to: string | undefined): string | null {
    try {
        // Validate that both inputs exist
        if (!from || !to) {
            //Defensive guard clauses — more readable
            Logger.error('Missing one or both file paths when calculating relative path.', { from, to });

            // vscode.window.showErrorMessage(
            //     'Error: Missing one or both file paths when calculating relative path.'
            // );
            // console.error('[getRelPath] Missing paths:', { from, to });
            
            return null;
        }

        // Check that inputs are valid absolute paths
        if (!path.isAbsolute(from) || !path.isAbsolute(to)) {
            Logger.error('One or both file paths are not absolute. Cannot calculate relative path.', { from, to });
            
            // vscode.window.showErrorMessage(
            //     'Error: One or both file paths are not absolute. Cannot calculate relative path.'
            // );
            // console.error('[getRelPath] Non-absolute paths:', { from, to });
            
            return null;
        }
        // Calculate relative path with safe normalization
        
        // Calculate relative path
        const rel = path.relative(from, to);

        // Normalize slashes only if needed
        const normalized = rel.includes('\\') ? rel.replace(/\\/g, '/') : rel;

        // Handle case where from and to are identical
        if (normalized.trim() === '') {
            // Added workspace name as helpful context
            Logger.warn('Source and target paths are identical.', { context: 'getRelPath',  workspace: vscode.workspace.name ?? 'Unknown Workspace', from, to});

            // vscode.window.showWarningMessage(
            //     'Warning: Source and target paths are identical. Relative path is empty.'
            // );
        
            return '.'; // Return current directory indicator
        }
            Logger.info('Calculated relative path.', { from, to, relativePath: normalized });

        return normalized;
  
    } catch (error) {
        Logger.error('Unexpected error calculating relative path.', { context: 'getRelPath', error, from, to });

        // vscode.window.showErrorMessage('Unexpected error calculating relative path. See console.');
        // console.error('[getRelPath] Exception thrown:', error);
        
        return null;
    }    
}

// import * as path from 'path';

// export function computeRelativePath(fromFsPath: string, toFsPath: string): string {
//     const fromDir = path.dirname(fromFsPath);
//     let rel = path.relative(fromDir, toFsPath);
//     // Normalize forward slashes //
//     if (path.sep !== '/') {
//         rel = rel.split(path.sep).join('/');
//     }
//     return rel;
// }
