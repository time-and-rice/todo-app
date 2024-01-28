import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { client } from "./client";
import { api } from "./infra/api";
import { AuthProvider } from "./providers/auth";
import { router } from "./router";
import { extendedTheme } from "./theme";

export function App() {
  useEffect(() => {
    // wake up cold start
    api.getHome();
  }, []);

  return (
    <Fragment>
      <ChakraProvider theme={extendedTheme}>
        <AuthProvider>
          <QueryClientProvider client={client}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </ChakraProvider>
    </Fragment>
  );
}
