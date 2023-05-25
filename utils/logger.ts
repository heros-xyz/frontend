import { getEnvVariables } from './env';

const envs = getEnvVariables()
const isDev = envs.NODE_ENV === 'development';

export const Logger = {
    info(message: any): void {
        if (isDev) {
            console.log(message);
        }
    },

    warn(message: any): void {
        if (isDev) {
            console.warn(message);
        }
    },

    error(message: any): void {
        if (isDev) {
            console.error(message);
        }
    },
};