import React from "react";
import { AnimatePresence } from "framer-motion";
import ThemeProvider from "providers/ThemeProvider";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

export const onServiceWorkerUpdateReady = () => window.location.reload(true);
