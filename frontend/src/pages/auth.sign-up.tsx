import { Button, Heading, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { AppLink } from "~/components/misc/app-link";
import { ErrorOrNull } from "~/components/misc/error-or-null";
import { InputField } from "~/components/form/input-filed";
import { useSignUp } from "~/hooks/auth/use-sign-up";

export type SignUpForm = {
  email: string;
  password: string;
  confirmation: string;
};

export default function SignUp() {
  const { signUp, loading, error } = useSignUp();

  const { register, handleSubmit } = useForm<SignUpForm>();

  return (
    <Stack spacing="4">
      <Heading alignSelf="center">Sign up</Heading>

      <ErrorOrNull error={error} />

      <Stack as="form" spacing="4" onSubmit={handleSubmit(signUp)}>
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
        <InputField
          label="Confirmation"
          type="password"
          isRequired
          register={register("confirmation")}
        />
        <Button type="submit" colorScheme="blue" disabled={loading}>
          Submit
        </Button>
      </Stack>

      <AppLink to="/auth/log-in">to Log in</AppLink>
    </Stack>
  );
}
