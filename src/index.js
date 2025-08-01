import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Redux/Reducer/index";
import { PersistGate } from "redux-persist/integration/react";
import { composeWithDevTools } from "redux-devtools-extension";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";



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
    composeWithDevTools(applyMiddleware(...middleware))
  );
} else {
  // In production keep middleware minimal
  store = createStore(persistedReducer, initialState, applyMiddleware(...middleware));
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
  
  // Remove any SSR fallback loading messages
  const fallbackElements = container.querySelectorAll('#app-loading, #fallback-loading, #ssr-fallback');
  fallbackElements.forEach(el => el.style.display = 'none');
  
  try {
    ReactDOM.hydrateRoot(container, AppComponent, {
      onRecoverableError: (error) => {
        console.warn('Hydration recoverable error:', error);
      }
    });
    console.log('✅ Hydration successful');
  } catch (error) {
    console.error('❌ Hydration failed, falling back to client render:', error);
    // Clear the container and render normally
    container.innerHTML = '';
    const root = ReactDOM.createRoot(container);
    root.render(AppComponent);
  }
} else {
  // No server-rendered content, render normally
  console.log('🎨 Client-side rendering...');
  const root = ReactDOM.createRoot(container);
  root.render(AppComponent);
}

reportWebVitals();
