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
//import logger from "redux-logger";
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

if (window.location.hostname !== 'localhost') {

  store = createStore(persistedReducer, applyMiddleware(...middleware));   // If not on localhost, don't include the logger middleware
} else {
  // If on localhost include the logger middleware
  
  const loggerMiddleware = createLogger();
  middleware.push(loggerMiddleware);
  
  store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
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

reportWebVitals();
