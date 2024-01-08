import { Navigate } from "react-router-dom";

import { useAuthSafely } from "~/providers/auth";

export default function Index() {
  const { authUser } = useAuthSafely();

  if (authUser) return <Navigate to="/me/tasks" />;
  else return <Navigate to="/auth/log-in" />;
}
