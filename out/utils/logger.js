"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const colors = {
    reset: "\x1b[0m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m",
    red: "\x1b[31m"
};
// Log level filtering — controls verbosity of console output
const LOG_LEVEL = 'info'; // possible values: 'info', 'warn', 'error'
function shouldLog(level) {
    const order = ['info', 'warn', 'error'];
    return order.indexOf(level) >= order.indexOf(LOG_LEVEL);
}
/**
 * Centralized logging utility for consistent defensive messaging.
 * - Sends user-friendly alerts (info/warn/error)
 * - Logs developer-readable diagnostics to console
 */
// src/utils/Logger.ts
class Logger {
    static setLogLevel(level) {
        this.logLevel = level;
        console.log(`[Logger] Log level set to: ${level}`);
    }
    static info(message, data) {
        if (this.logLevel === 'info')
            console.log(`ℹ️ [INFO] ${message}`, data ?? '');
    }
    static warn(message, data) {
        if (['info', 'warn'].includes(this.logLevel))
            console.warn(`⚠️ [WARN] ${message}`, data ?? '');
    }
    static error(message, data) {
        console.error(`❌ [ERROR] ${message}`, data ?? '');
    }
}
exports.Logger = Logger;
Logger.logLevel = 'info';
;
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
//# sourceMappingURL=Logger.js.map