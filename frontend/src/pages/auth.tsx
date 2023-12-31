import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Guard } from "~/hocs/guard";

const AuthLayout = Guard("BeforeAuth", function () {
  return (
    <Container maxW="md" px="4" py="8">
      <Outlet />
    </Container>
  );
});

export default AuthLayout;
