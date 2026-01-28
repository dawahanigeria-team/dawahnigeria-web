import * as Sentry from "@sentry/react";

/**
 * centralized logger utility
 * - Wraps console methods to ensure logs are captured by PostHog (via console recording)
 * - Explicitly sends errors to Sentry
 * - Can be extended for other log sinks
 */

const logger = {
  /**
   * General info logging
   */
  log: (...args) => {
    console.log(...args);
  },

  /**
   * Info logging
   */
  info: (...args) => {
    console.info(...args);
  },

  /**
   * Warning logging
   */
  warn: (...args) => {
    console.warn(...args);
  },

  /**
   * Error logging - sends to Sentry and Console
   * @param {Error|string} error - The error object or message
   * @param {Object} [context] - Additional context/metadata
   */
  error: (error, context = {}) => {
    // 1. Log to console so PostHog Session Replay sees it
    console.error(error, context);

    // 2. Send to Sentry explicitly
    Sentry.captureException(error, {
      extra: context,
    });
  },
};

export default logger;
