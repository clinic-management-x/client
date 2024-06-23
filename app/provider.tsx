"use client";

import { store } from "@/redux/store";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

export default function Providers({ children }: { children: React.ReactNode }) {
  persistStore(store);
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" enableSystem={true} attribute="class">
        <Toaster
          position="top-right"
          reverseOrder={false}
          containerStyle={{ zIndex: 99999999 }}
        />
        <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  );
}
