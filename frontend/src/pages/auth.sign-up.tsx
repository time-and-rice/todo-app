import { Button, Heading, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { AppLink } from "~/components/app-link";
import { InputField } from "~/components/form/input-filed";

type SignUpForm = {
  email: string;
  password: string;
  confirmation: string;
};

export default function SignUp() {
  const { register, handleSubmit } = useForm<SignUpForm>();

  function onSubmit(v: SignUpForm) {
    console.log(v);
  }

  return (
    <Stack spacing="4">
      <Heading alignSelf="center">Sign up</Heading>

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
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </Stack>

      <AppLink to="/auth/log-in">to Log in</AppLink>
    </Stack>
  );
}
