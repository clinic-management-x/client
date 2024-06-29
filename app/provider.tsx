"use client";

import { store } from "@/redux/store";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { SWRConfig } from "swr";

export default function Providers({ children }: { children: React.ReactNode }) {
  persistStore(store);
  const router = useRouter();
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" enableSystem={true} attribute="class">
        <SWRConfig
          value={{
            onError: (error, key) => {
              if (error?.response?.status === 404) {
                router.push("/not-found");
              }
            },
          }}
        >
          <Toaster
            position="top-right"
            reverseOrder={false}
            containerStyle={{ zIndex: 99999999 }}
          />
          <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
        </SWRConfig>
      </ThemeProvider>
    </Provider>
  );
}
