import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import { Store } from "./redux/Store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={Store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>
);
