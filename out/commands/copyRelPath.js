"use strict";
// Command Handler //
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyActiveRelPath = copyActiveRelPath;
// Version 0.0.2//
const vscode = __importStar(require("vscode"));
const relPath_1 = require("../commands/relPath");
const Logger_1 = require("../utils/Logger");
/**
 * Copies the relative path from the workspace root to the active file.
 * Handles missing editors, missing workspaces, and copy errors gracefully.
 */
async function copyActiveRelPath() {
    try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            Logger_1.Logger.error('No active editor found.', { context: 'copyActiveRelPath' });
            return;
        }
        const activePath = editor.document.uri.fsPath;
        if (!activePath) {
            Logger_1.Logger.error('Active editor has no file path.', { context: 'copyActiveRelPath' });
            // vscode.window.showErrorMessage('Could not determine active file path.');
            return;
        }
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
        if (!workspaceFolder) {
            Logger_1.Logger.error('Active file is not within a workspace.', { context: 'copyActiveRelPath', activePath });
            // vscode.window.showErrorMessage(
            //     'This file is not part of any workspace. Relative path cannot be calculated.'
            // );
            return;
        }
        const workspacePath = workspaceFolder.uri.fsPath;
        const rel = (0, relPath_1.getRelPath)(workspacePath, activePath);
        // Type-Safety for fix for potential null return
        if (!rel) {
            Logger_1.Logger.error('Relative path calculation failed.', { workspacePath, activePath });
            // vscode.window.showErrorMessage('Failed to calculate relative path. See console for details.');
            return;
        }
        await vscode.env.clipboard.writeText(rel);
        //Improved information logging with user context
        Logger_1.Logger.info('Copied relative path to clipboard.', { relativePath: rel });
        vscode.window.setStatusBarMessage(`📋 Copied: ${rel}`, 2500);
        // vscode.window.showInformationMessage(`Copied relative path: ${rel}`);
    }
    catch (error) {
        Logger_1.Logger.error('Unexpected error copying relative path.', { context: 'copyActiveRelPath', error });
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
//# sourceMappingURL=copyRelPath.js.map