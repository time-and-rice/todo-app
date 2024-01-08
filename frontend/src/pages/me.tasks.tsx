import { Box } from "@chakra-ui/react";

import { useAuth } from "~/providers/auth";

export default function Tasks() {
  const { authUser } = useAuth();

  return (
    <Box>
      <Box>uid: {authUser.uid}</Box>
      <Box>email: {authUser.email}</Box>
    </Box>
  );
}
