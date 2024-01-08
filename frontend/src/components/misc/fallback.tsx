import { Alert, Center, Spinner } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";

type FallbackProps = {
  loading: boolean;
  error: unknown;
  children: ReactNode;
};

export function Fallback(props: FallbackProps) {
  const errMsg = useMemo(() => {
    if (props.error)
      return props.error instanceof Error
        ? props.error.message
        : "unknown error";
  }, [props.error]);

  if (props.loading)
    return (
      <Center px="2" py="8">
        <Spinner />
      </Center>
    );

  if (errMsg) return <Alert status="error">{errMsg}</Alert>;

  return props.children;
}
