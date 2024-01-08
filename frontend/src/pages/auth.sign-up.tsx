import { Button, Heading, Stack } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import { AppLink } from "~/components/app-link";
import { ErrorOrNull } from "~/components/error-or-null";
import { InputField } from "~/components/form/input-filed";
import { useTryState } from "~/hooks/use-try-state";
import { auth } from "~/infra/fir";

type SignUpForm = {
  email: string;
  password: string;
  confirmation: string;
};

export default function SignUp() {
  const { loading, setLoading, error, setError } = useTryState();

  const { register, handleSubmit } = useForm<SignUpForm>();

  async function onSubmit(v: SignUpForm) {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, v.email, v.password);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing="4">
      <Heading alignSelf="center">Sign up</Heading>

      <ErrorOrNull error={error} />

      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
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
