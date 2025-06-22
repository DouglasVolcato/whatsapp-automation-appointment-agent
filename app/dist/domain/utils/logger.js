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
exports.Logger = void 0;
const env_1 = require("../../main/utils/env");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function getCallerLocation(stackDepth = 3) {
    const stack = new Error().stack;
    if (!stack)
        return "Unknown location";
    const lines = stack.split("\n").slice(stackDepth);
    for (const line of lines) {
        const match = line.match(/\(?(.+):(\d+):(\d+)\)?$/);
        if (match) {
            const [, filePath, lineNumber, columnNumber] = match;
            return `${path.resolve(filePath)}:${lineNumber}:${columnNumber}`;
        }
    }
    return "Unknown location";
}
class Logger {
    static writeLog(filePath, log) {
        const time = new Date().toISOString().split(".")[0].replace("T", " ");
        fs.appendFile(filePath, `${time} ${log}\n\n`, (err) => {
            if (err) {
                console.error("Failed to write to log file:", err);
            }
        });
    }
    static error(error) {
        if (env_1.Env.ENABLE_LOGS) {
            const location = getCallerLocation();
            const errorType = error?.name || "UnknownError";
            const errorMessage = error?.message || String(error);
            const errorStack = error?.stack || "No stack trace";
            const log = `[ERROR] at ${location}\nType: ${errorType}\nMessage: ${errorMessage}\nStack:\n${errorStack}`;
            this.writeLog("logs/errors.txt", log);
        }
    }
    static dbQuery(query) {
        if (env_1.Env.ENABLE_LOGS) {
            const location = getCallerLocation();
            const log = `[DB QUERY] at ${location}\nSQL: ${query.sql}\nParams: ${JSON.stringify(query.params)}`;
            this.writeLog("logs/db.txt", log);
        }
    }
    static dbResponse(response) {
        if (env_1.Env.ENABLE_LOGS) {
            const location = getCallerLocation();
            const log = `[DB RESPONSE] at ${location}\n${JSON.stringify(response)}`;
            this.writeLog("logs/db.txt", log);
        }
    }
    static apiRequest(request) {
        if (env_1.Env.ENABLE_LOGS) {
            const location = getCallerLocation();
            const log = `[API REQUEST] at ${location}\nPath: ${request.path}\nData: ${JSON.stringify(request.data)}`;
            this.writeLog("logs/api.txt", log);
        }
    }
    static apiResponse(input) {
        if (env_1.Env.ENABLE_LOGS) {
            const location = getCallerLocation();
            const log = `[API RESPONSE] at ${location}\n${JSON.stringify(input.response)}`;
            this.writeLog("logs/api.txt", log);
        }
    }
    static cronjob(message) {
        if (env_1.Env.ENABLE_LOGS) {
            const location = getCallerLocation();
            const log = `[CRONJOB] ${message} at ${location}`;
            this.writeLog("logs/cronjobs.txt", log);
        }
    }
}
exports.Logger = Logger;
