import { Alert } from "@chakra-ui/react";
import { useMemo } from "react";

type ErrorOrNullProps = {
  error: unknown;
};

export function ErrorOrNull(props: ErrorOrNullProps) {
  const errMsg = useMemo(() => {
    if (props.error)
      return props.error instanceof Error
        ? props.error.message
        : "unknown error";
  }, [props.error]);

  if (errMsg) return <Alert status="error">{errMsg}</Alert>;
}
