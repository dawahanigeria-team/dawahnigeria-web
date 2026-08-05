import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Redux/Reducer/index";
import { PersistGate } from "redux-persist/integration/react";
import { thunk } from "redux-thunk";
import { HelmetProvider } from "react-helmet-async";
import { setStore } from "./store/storeRegistry";
import { isTawkError } from "./utils/thirdPartyErrors";

const { Suspense, lazy } = React;

// Defer Sentry initialization to after first render for faster FCP
const initSentry = () => {
  import("@sentry/react").then((Sentry) => {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      environment:
        process.env.REACT_APP_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
      release: process.env.REACT_APP_SENTRY_RELEASE,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.reactRouterV6BrowserTracingIntegration({
          useEffect: React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
      ],
      enableTracing: true,
      tracesSampleRate: parseFloat(
        process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE || "0.1"
      ),
      tracePropagationTargets: [
        "localhost",
        /^https:\/\/backend\.dawahbox\.com\/api/,
        process.env.REACT_APP_API_BASE_URL,
      ].filter(Boolean),
      profilesSampleRate: parseFloat(
        process.env.REACT_APP_SENTRY_PROFILES_SAMPLE_RATE || "0"
      ),
      ignoreErrors: ["Unable to store cookie"],
      beforeSend(event, hint) {
        const originalError = hint?.originalException;

        if (
          isTawkError({
            message:
              originalError?.message || event?.message || event?.exception?.values?.[0]?.value,
            filename: event?.request?.url || "",
            stack:
              originalError?.stack ||
              event?.exception?.values?.[0]?.stacktrace?.frames
                ?.map((frame) => `${frame.filename || ""} ${frame.function || ""}`)
                .join("\n") ||
              "",
          })
        ) {
          return null;
        }

        return event;
      },
    });
  });
};

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(initSentry);
} else {
  setTimeout(initSentry, 1);
}

const persistConfig = {
  key: "root",
  storage,
  // Search state is a snapshot of one API response, not user data worth
  // restoring. Persisting it meant a result array saved under an older API
  // shape was rehydrated on every later visit and rendered before any fresh
  // fetch could replace it — a row missing `_id` then took the whole search
  // page down through the ErrorBoundary, and reloading only replayed it.
  // The page refetches on mount, so dropping this loses nothing.
  blacklist: ["search"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux DevTools Extension support
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
setStore(store);

const persistor = persistStore(store);
const container = document.getElementById("root");

// Lazy-load PostHog so posthog-js (~150KB) doesn't block initial bundle
const postHogApiKey = process.env.REACT_APP_POSTHOG_KEY;
const postHogHost = process.env.REACT_APP_POSTHOG_HOST;

const LazyPostHogProvider = postHogApiKey && postHogHost
  ? lazy(() =>
      import("posthog-js/react").then((mod) => ({
        default: ({ children }) => (
          <mod.PostHogProvider
            apiKey={postHogApiKey}
            options={{
              api_host: postHogHost,
              capture_pageview: true,
              capture_pageleave: true,
              autocapture: true,
              disable_session_recording: false,
              enable_recording_console_log: true,
              loaded: (posthog) => {
                if (process.env.NODE_ENV === "development") {
                  posthog.debug();
                }
              },
              capture_metrics: true,
            }}
          >
            {children}
          </mod.PostHogProvider>
        ),
      }))
    )
  : null;

const AppWithProviders = ({ children }) => {
  if (LazyPostHogProvider) {
    return (
      <Suspense fallback={children}>
        <LazyPostHogProvider>{children}</LazyPostHogProvider>
      </Suspense>
    );
  }
  return <>{children}</>;
};

const AppComponent = (
  <HelmetProvider>
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
  </HelmetProvider>
);

const root = ReactDOM.createRoot(container);
root.render(AppComponent);

reportWebVitals();
