import { ChakraProvider } from "@chakra-ui/react";
import { Fragment } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { extendedTheme } from "./theme";

export function App() {
  return (
    <Fragment>
      <ChakraProvider theme={extendedTheme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Fragment>
  );
}
