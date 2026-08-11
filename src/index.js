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

const { Suspense } = React;

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

// Load analytics after first paint. Do not suspend/wrap the application: the
// previous Suspense fallback mounted the full app once without PostHog and
// then mounted it again inside the provider, duplicating startup API work.
const postHogApiKey = process.env.REACT_APP_POSTHOG_KEY;
const postHogHost = process.env.REACT_APP_POSTHOG_HOST;

const initPostHog = () => {
  if (!postHogApiKey || !postHogHost) return;
  import("posthog-js").then(({ default: posthog }) => {
    posthog.init(postHogApiKey, {
      api_host: postHogHost,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      disable_session_recording: false,
      enable_recording_console_log: true,
      capture_performance: true,
      loaded: (instance) => {
        instance.register({ app: "cra-web" });
        if (process.env.NODE_ENV === "development") instance.debug();
      },
    });
  });
};

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(initPostHog, { timeout: 1500 });
} else {
  setTimeout(initPostHog, 0);
}

const AppComponent = (
  <HelmetProvider>
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
  </HelmetProvider>
);

const root = ReactDOM.createRoot(container);
root.render(AppComponent);

reportWebVitals((metric) => {
  window.posthog?.capture("web_vital", {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    navigation_type: metric.navigationType,
    app: "cra-web",
  });
});
