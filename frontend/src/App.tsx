import { Fragment } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

export function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}
