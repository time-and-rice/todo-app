import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

import { getTasks } from "~/infra/api/tasks";
import { useAuth } from "~/providers/auth";

export default function Tasks() {
  const { authUser } = useAuth();

  useEffect(() => {
    getTasks()
      .then((r) => r.data)
      .then(console.log);
  }, []);

  return (
    <Box>
      <Box>uid: {authUser.uid}</Box>
      <Box>email: {authUser.email}</Box>
    </Box>
  );
}
