import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <Container maxW="md" px="4" py="8">
      <Outlet />
    </Container>
  );
}
