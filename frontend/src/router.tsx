import { createBrowserRouter } from "react-router-dom";

import Index from "./pages/_index";
import NotFound from "./pages/404";
import AuthLayout from "./pages/auth";
import LogIn from "./pages/auth.log-in";
import SignUp from "./pages/auth.sign-up";
import MeLayout from "./pages/me";
import Tasks from "./pages/me.tasks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "log-in",
        element: <LogIn />,
      },
    ],
  },
  {
    path: "/me",
    element: <MeLayout />,
    children: [
      {
        path: "tasks",
        element: <Tasks />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
