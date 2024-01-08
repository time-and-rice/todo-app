import { ChakraProvider } from "@chakra-ui/react";
import { Fragment } from "react";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./providers/auth";
import { router } from "./router";
import { extendedTheme } from "./theme";

export function App() {
  return (
    <Fragment>
      <ChakraProvider theme={extendedTheme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </Fragment>
  );
}
