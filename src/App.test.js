/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders App component", () => {
  render(<App />);
  expect(document.querySelector('.App')).toBeInTheDocument();
});
