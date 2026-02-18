let Sentry = null;

import("@sentry/react").then((mod) => {
  Sentry = mod;
});

const logger = {
  log: (...args) => {
    console.log(...args);
  },

  info: (...args) => {
    console.info(...args);
  },

  warn: (...args) => {
    console.warn(...args);
  },

  error: (error, context = {}) => {
    console.error(error, context);

    if (Sentry) {
      Sentry.captureException(error, {
        extra: context,
      });
    }
  },
};

export default logger;
