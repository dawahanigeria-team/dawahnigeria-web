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
import { composeWithDevTools } from "redux-devtools-extension";

// Initialize Sentry (client)
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
  release: process.env.REACT_APP_SENTRY_RELEASE,
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  enableTracing: true,
  tracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE || '0.1'),
  profilesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_PROFILES_SAMPLE_RATE || '0'),
});
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";



const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];
let store;

// Get initial state from SSR if available
const initialState = typeof window !== 'undefined' ? (window.__INITIAL_STATE__ || {}) : {};

// Clean up the global variable
if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
  delete window.__INITIAL_STATE__;
}

if (process.env.NODE_ENV === "development") {
  // Include logger and devtools in development for easier debugging
  const loggerMiddleware = createLogger();
  middleware.push(loggerMiddleware);

  store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware),
      Sentry.createReduxEnhancer()
    )
  );
} else {
  // In production keep middleware minimal
  store = createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      Sentry.createReduxEnhancer()
    )
  );
}

let persistor = persistStore(store);
const container = document.getElementById("root");

const AppComponent = (
  <>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  </>
);

// Use React 19's hydrateRoot for SSR hydration
if (container.hasChildNodes()) {
  // Server-rendered content exists, hydrate it
  console.log('🔄 Hydrating SSR content...');
  
  // Remove any SSR fallback loading messages and hide any visible fallback content
  const fallbackElements = container.querySelectorAll('#app-loading, #fallback-loading, #ssr-fallback');
  fallbackElements.forEach(el => {
    el.style.display = 'none';
    el.style.visibility = 'hidden';
  });
  
  // Hide any elements that might be causing white background flash
  const potentialWhiteElements = container.children;
  for (let i = 0; i < potentialWhiteElements.length; i++) {
    const el = potentialWhiteElements[i];
    if (el.style && (el.style.backgroundColor === 'white' || el.style.background.includes('white'))) {
      el.style.backgroundColor = 'transparent';
    }
  }
  
  try {
    ReactDOM.hydrateRoot(container, AppComponent, {
      // React 19 error hooks: Sentry does not provide reactErrorHandler, so fallback to default logging
      onUncaughtError: (error, errorInfo) => {
        Sentry.captureException(error);
        console.warn('Uncaught error', error, errorInfo?.componentStack);
      },
      onCaughtError: (error, errorInfo) => {
        Sentry.captureException(error);
      },
      onRecoverableError: (error, errorInfo) => {
        Sentry.captureException(error);
      },
    });
    console.log('✅ Hydration successful');
  } catch (error) {
    console.error('❌ Hydration failed, falling back to client render:', error);
    // Clear the container and render normally
    container.innerHTML = '';
    const root = ReactDOM.createRoot(container, {
      onUncaughtError: (error, errorInfo) => {
        Sentry.captureException(error);
        console.warn('Uncaught error', error, errorInfo?.componentStack);
      },
      onCaughtError: (error, errorInfo) => {
        Sentry.captureException(error);
      },
      onRecoverableError: (error, errorInfo) => {
        Sentry.captureException(error);
      },
    });
    root.render(AppComponent);
  }
} else {
  // No server-rendered content, render normally
  console.log('🎨 Client-side rendering...');
  const root = ReactDOM.createRoot(container);
  root.render(AppComponent);
}

reportWebVitals();
