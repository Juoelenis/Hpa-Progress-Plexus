import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import ThemeProviderWrapper from "./utils/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./Store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProviderWrapper>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProviderWrapper>
);
