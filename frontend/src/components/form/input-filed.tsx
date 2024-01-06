import { Input, InputProps } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper } from "./field-wrapper";

type InputFieldProps = InputProps & {
  label?: string;
  register?: UseFormRegisterReturn;
};

export function InputField({ label, register, ...rest }: InputFieldProps) {
  return (
    <FieldWrapper label={label}>
      <Input {...rest} {...register} />
    </FieldWrapper>
  );
}
