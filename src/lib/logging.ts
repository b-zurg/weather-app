// messages are unknown because we are not guaranteed
type LogFunction = (...event: unknown[]) => void;

/**
 * Logs a message with info severity
 */
export const logInfo: LogFunction = (event) => console.info(event);
/**
 * Logs a message with error severity
 */
export const logError: LogFunction = (event) => console.error(event);
/**
 * Logs a message with debug severity
 */
export const logDebug: LogFunction = (event) => console.debug(event);
