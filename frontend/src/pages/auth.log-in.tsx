import { Button, Heading, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { AppLink } from "~/components/misc/app-link";
import { ErrorOrNull } from "~/components/misc/error-or-null";
import { InputField } from "~/components/form/input-filed";
import { useLogIn } from "~/hooks/auth/use-log-in";

export type LogInForm = {
  email: string;
  password: string;
};

export default function LogIn() {
  const { logIn, loading, error } = useLogIn();

  const { register, handleSubmit } = useForm<LogInForm>();

  return (
    <Stack spacing="4">
      <Heading alignSelf="center">Log in</Heading>

      <ErrorOrNull error={error} />

      <Stack as="form" spacing="4" onSubmit={handleSubmit(logIn)}>
        <InputField
          label="Email"
          type="email"
          isRequired
          register={register("email")}
        />
        <InputField
          label="Password"
          type="password"
          isRequired
          register={register("password")}
        />
        <Button type="submit" colorScheme="blue" disabled={loading}>
          Submit
        </Button>
      </Stack>

      <AppLink to="/auth/sign-up">to Sign up</AppLink>
    </Stack>
  );
}
