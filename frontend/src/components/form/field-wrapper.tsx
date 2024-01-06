import { Box, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

type FieldWrapperProps = {
  label?: string;
  children: ReactNode;
};

export function FieldWrapper(props: FieldWrapperProps) {
  return (
    <Stack spacing="1">
      {props.label && <Box>{props.label}</Box>}
      {props.children}
    </Stack>
  );
}
