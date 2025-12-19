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

const AppComponent = (
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
);

const root = ReactDOM.createRoot(container);
root.render(AppComponent);

reportWebVitals();
