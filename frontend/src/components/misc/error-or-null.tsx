import { Alert } from "@chakra-ui/react";
import { useMemo } from "react";

import { getErrorMessage } from "~/utils/get-error-message";

type ErrorOrNullProps = {
  error: unknown;
};

export function ErrorOrNull(props: ErrorOrNullProps) {
  const errMsg = useMemo(() => {
    if (props.error) return getErrorMessage(props.error);
  }, [props.error]);

  if (errMsg)
    return (
      <Alert status="error" maxW="md" whiteSpace="pre-wrap">
        {errMsg}
      </Alert>
    );
}
