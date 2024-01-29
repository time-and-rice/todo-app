import { Alert, Center, Spinner } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";

import { getErrorMessage } from "~/utils/get-error-message";

type FallbackProps = {
  loading: boolean;
  loadingComponent?: ReactNode;
  error: unknown;
  errorComponent?: ReactNode;
  children: ReactNode;
};

export function Fallback(props: FallbackProps) {
  const errMsg = useMemo(() => {
    if (props.error) return getErrorMessage(props.error);
  }, [props.error]);

  if (props.loading)
    if (props.loadingComponent) return props.loadingComponent;
    else
      return (
        <Center px="2" py="8">
          <Spinner />
        </Center>
      );

  if (errMsg)
    if (props.errorComponent) return props.errorComponent;
    else
      return (
        <Center px="2" py="8">
          <Alert status="error" whiteSpace="pre-wrap">
            {errMsg}
          </Alert>
        </Center>
      );

  return props.children;
}
