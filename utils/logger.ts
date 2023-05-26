import { getEnvVariables } from './env';

const envs = getEnvVariables()
const isDev = envs.NODE_ENV === 'development';

export const Logger = {
    // pass args to console.log
    info(...args: any): void {
        if (isDev) {
            console.log(...args);
        }
    },

    warn(...args: any): void {
        if (isDev) {
            console.warn(...args);
        }
    },

    error(...args: any): void {
        if (isDev) {
            console.error(...args);
        }
    },
};