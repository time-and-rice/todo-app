import { Button, Heading, Stack } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import { AppLink } from "~/components/app-link";
import { ErrorOrNull } from "~/components/error-or-null";
import { InputField } from "~/components/form/input-filed";
import { useTryState } from "~/hooks/use-try-state";
import { auth } from "~/infra/fir";

type LogInForm = {
  email: string;
  password: string;
};

export default function LogIn() {
  const { loading, setLoading, error, setError } = useTryState();

  const { register, handleSubmit } = useForm<LogInForm>();

  async function onSubmit(v: LogInForm) {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, v.email, v.password);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing="4">
      <Heading alignSelf="center">Log in</Heading>

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
        <Button type="submit" colorScheme="blue" disabled={loading}>
          Submit
        </Button>
      </Stack>

      <AppLink to="/auth/sign-up">to Sign up</AppLink>
    </Stack>
  );
}
