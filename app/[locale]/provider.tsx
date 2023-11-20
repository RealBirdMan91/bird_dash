"use client";
import { ThemeProvider, useTheme } from "next-themes";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const { resolvedTheme } = useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick={true}
        pauseOnFocusLoss
        pauseOnHover
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Provider;
