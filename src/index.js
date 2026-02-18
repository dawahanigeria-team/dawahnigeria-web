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
