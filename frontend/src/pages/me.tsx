import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Guard } from "~/hocs/guard";

const MeLayout = Guard("AfterAuth", function () {
  return (
    <Container maxW="lg" px="4" py="8">
      <Outlet />
    </Container>
  );
});

export default MeLayout;
