/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { HelmetProvider } from "react-helmet-async";
import rootReducer from "./Redux/Reducer";
import App from "./App";

jest.mock("axios", () => {
  const request = jest.fn(() => Promise.resolve({ data: {} }));
  request.get = jest.fn(() => Promise.resolve({ data: {} }));
  request.post = jest.fn(() => Promise.resolve({ data: {} }));
  request.put = jest.fn(() => Promise.resolve({ data: {} }));
  request.delete = jest.fn(() => Promise.resolve({ data: {} }));
  request.interceptors = {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  };

  const axios = Object.assign(request, {
    create: jest.fn(() => request),
    isAxiosError: jest.fn(() => false),
  });

  return { __esModule: true, default: axios };
});

jest.mock("react-router-dom", () => {
  const ReactLib = require("react");
  const passthrough = ({ children }) =>
    ReactLib.createElement(ReactLib.Fragment, null, children);
  return {
    Routes: passthrough,
    Route: () => null,
    Navigate: () => null,
    Link: passthrough,
    NavLink: passthrough,
    Outlet: () => null,
    useLocation: () => ({ pathname: "/dawahcast", search: "", hash: "" }),
    useNavigate: () => jest.fn(),
    useParams: () => ({}),
    useSearchParams: () => [new URLSearchParams(), jest.fn()],
  };
}, { virtual: true });

beforeEach(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

test("renders App component", () => {
  const store = createStore(rootReducer);
  render(
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  );
  expect(document.querySelector('.App')).toBeInTheDocument();
});
