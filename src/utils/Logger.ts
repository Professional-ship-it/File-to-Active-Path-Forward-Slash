// src/utils/logger.ts
import { log } from 'console';
import * as vscode from 'vscode';

const colors = {
    reset: "\x1b[0m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m",
    red: "\x1b[31m"
};

// Log level filtering — controls verbosity of console output
const LOG_LEVEL = 'info'; // possible values: 'info', 'warn', 'error'

function shouldLog(level: 'info' | 'warn' | 'error'): boolean {
    const order = ['info', 'warn', 'error'];
    return order.indexOf(level) >= order.indexOf(LOG_LEVEL);
}
/**
 * Centralized logging utility for consistent defensive messaging.
 * - Sends user-friendly alerts (info/warn/error)
 * - Logs developer-readable diagnostics to console
 */
// src/utils/Logger.ts
export class Logger {
    private static logLevel: 'info' | 'warn' | 'error' = 'info';

    static setLogLevel(level: 'info' | 'warn' | 'error') {
        this.logLevel = level;
        console.log(`[Logger] Log level set to: ${level}`);
    }

    static info(message: string, data?: any) {
        if (this.logLevel === 'info') console.log(`ℹ️ [INFO] ${message}`, data ?? '');
    }

    static warn(message: string, data?: any) {
        if (['info', 'warn'].includes(this.logLevel))
            console.warn(`⚠️ [WARN] ${message}`, data ?? '');
    }

    static error(message: string, data?: any) {
        console.error(`❌ [ERROR] ${message}`, data ?? '');
    }
};

// Version 0.0.0
// export const Logger = {
//     info(message: string, ...optional: any[]) {
//         if (shouldLog('info')) {
//             console.log(`[INFO ${new Date().toISOString()}] ${message}`, ...optional);
//         }
//     },

//     warn(message: string, ...optional: any[]) {
//         vscode.window.showWarningMessage(message);
//         if (shouldLog('warn')) {
//             console.warn(`[WARN ${new Date().toISOString()}] ${message}`, ...optional);
//         }
//     },

//     error(message: string, ...optional: any[]) {
//         vscode.window.showErrorMessage(message);
//         if (shouldLog('error')) {
//             console.error(`[ERROR ${new Date().toISOString()}] ${message}`, ...optional);
//         }
//     }
// };