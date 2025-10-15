"use strict";
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
exports.getRelPath = getRelPath;
// modular path for logic //
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const Logger_1 = require("../utils/Logger");
/**
 * Calculates a normalized relative path from `from` to `to`.
 * Defensively checks for invalid or missing paths.
 */
function getRelPath(from, to) {
    try {
        // Validate that both inputs exist
        if (!from || !to) {
            //Defensive guard clauses — more readable
            Logger_1.Logger.error('Missing one or both file paths when calculating relative path.', { from, to });
            // vscode.window.showErrorMessage(
            //     'Error: Missing one or both file paths when calculating relative path.'
            // );
            // console.error('[getRelPath] Missing paths:', { from, to });
            return null;
        }
        // Check that inputs are valid absolute paths
        if (!path.isAbsolute(from) || !path.isAbsolute(to)) {
            Logger_1.Logger.error('One or both file paths are not absolute. Cannot calculate relative path.', { from, to });
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
            Logger_1.Logger.warn('Source and target paths are identical.', { context: 'getRelPath', workspace: vscode.workspace.name ?? 'Unknown Workspace', from, to });
            // vscode.window.showWarningMessage(
            //     'Warning: Source and target paths are identical. Relative path is empty.'
            // );
            return '.'; // Return current directory indicator
        }
        Logger_1.Logger.info('Calculated relative path.', { from, to, relativePath: normalized });
        return normalized;
    }
    catch (error) {
        Logger_1.Logger.error('Unexpected error calculating relative path.', { context: 'getRelPath', error, from, to });
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
//# sourceMappingURL=relPath.js.map