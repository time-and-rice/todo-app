import { Container, Heading, Stack } from "@chakra-ui/react";

import { AppLink } from "~/components/misc/app-link";

export default function NotFound() {
  return (
    <Container maxW="md" px="4" py="8">
      <Stack spacing="6" alignItems="center">
        <Heading>Not found</Heading>
        <AppLink to="/">to Home</AppLink>
      </Stack>
    </Container>
  );
}
