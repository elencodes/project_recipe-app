import { MotionGlobalConfig } from 'framer-motion';

export function isTestMode(): boolean {
    return !!(window as unknown as { Cypress: unknown }).Cypress;
}

export const configureTestMode = (): void => {
    if (isTestMode()) {
        MotionGlobalConfig.skipAnimations = true;
    }
    return;
};
