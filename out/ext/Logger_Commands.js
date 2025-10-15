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
exports.registerLoggerCommands = registerLoggerCommands;
// Declares and registers commands related to Logger settings
// src/ext/Logger_Commands.ts
const vscode = __importStar(require("vscode"));
const Logger_1 = require("../utils/Logger");
/**
 * Registers the "logger_Level" command to change log verbosity at runtime.
 */
function registerLoggerCommands(context) {
    const cmd = vscode.commands.registerCommand('logger_Level', async () => {
        const options = [
            { label: 'info', description: 'Show all logs' },
            { label: 'warn', description: 'Show warnings and errors' },
            { label: 'error', description: 'Show only errors' },
        ];
        const selection = await vscode.window.showQuickPick(options, {
            placeHolder: 'Select log level',
        });
        if (selection) {
            Logger_1.Logger.setLogLevel(selection.label);
            Logger_1.Logger.info(`Log level set to ${selection.label.toUpperCase()}`);
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
//# sourceMappingURL=Logger_Commands.js.map