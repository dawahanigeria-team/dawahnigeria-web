import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";
import { BrowserRouter as Router } from "react-router-dom";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Redux/Reducer/index";
import { PersistGate } from "redux-persist/integration/react";
import { thunk } from "redux-thunk";
import { PostHogProvider } from "posthog-js/react";

// Initialize Sentry (client)
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment:
    process.env.REACT_APP_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
  release: process.env.REACT_APP_SENTRY_RELEASE,
  integrations: [Sentry.browserTracingIntegration()],
  enableTracing: true,
  tracesSampleRate: parseFloat(
    process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE || "0.1"
  ),
  profilesSampleRate: parseFloat(
    process.env.REACT_APP_SENTRY_PROFILES_SAMPLE_RATE || "0"
  ),
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux DevTools Extension support
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk), Sentry.createReduxEnhancer())
);

const persistor = persistStore(store);
const container = document.getElementById("root");

// Check PostHog configuration
const postHogApiKey = process.env.REACT_APP_POSTHOG_KEY;
const postHogHost = process.env.REACT_APP_POSTHOG_HOST;

if (process.env.NODE_ENV === 'development') {
  console.log('🔍 PostHog Environment Check:', {
    apiKey: postHogApiKey ? '✓ Set' : '✗ Missing (REACT_APP_POSTHOG_KEY)',
    apiHost: postHogHost,
    allEnvVars: Object.keys(process.env).filter(key => key.includes('POSTHOG')),
  });
}

if (!postHogApiKey || !postHogHost) {
  // Only log detailed configuration info in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '⚠️ PostHog is not configured. Missing environment variables:',
      {
        apiKey: postHogApiKey ? '✓ Set' : '✗ Missing (REACT_APP_POSTHOG_KEY)',
        apiHost: postHogHost ? '✓ Set' : '✗ Missing (REACT_APP_POSTHOG_HOST)',
        env: process.env.NODE_ENV,
      }
    );
  } else {
    // In production, only log a generic error without exposing config details
    console.error(
      'PostHog analytics is not configured. Please set REACT_APP_POSTHOG_KEY and REACT_APP_POSTHOG_HOST environment variables.'
    );
  }
} else if (process.env.NODE_ENV === 'development') {
  // Only log configuration details in development
  console.log('PostHog Config:', {
    apiKey: '✓ Set',
    apiHost: postHogHost,
    env: process.env.NODE_ENV,
  });
}

// Wrapper component to conditionally render PostHogProvider
const AppWithProviders = ({ children }) => {
  if (postHogApiKey && postHogHost) {
    return (
      <PostHogProvider
        apiKey={postHogApiKey}
        options={{
          api_host: postHogHost,
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: true,
          disable_session_recording: false,
          enable_recording_console_log: true,
          loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ PostHog loaded successfully!', posthog);
              posthog.debug();
            }
          },
          // Add error handling for PostHog initialization failures
          capture_metrics: true,
        }}
      >
        {children}
      </PostHogProvider>
    );
  }
  // Render without PostHogProvider if configuration is missing
  return <>{children}</>;
};

const AppComponent = (
  <AppWithProviders>
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  </AppWithProviders>
);

const root = ReactDOM.createRoot(container);
root.render(AppComponent);

reportWebVitals();