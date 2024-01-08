import { useToast, UseToastOptions } from "@chakra-ui/react";

const toastBaseOptions: UseToastOptions = {
  position: "top-right",
  isClosable: true,
};

export function useAppToast() {
  const toast = useToast();

  function success(title: string) {
    toast({
      ...toastBaseOptions,
      status: "success",
      title,
    });
  }

  function error(title: string) {
    toast({
      ...toastBaseOptions,
      status: "error",
      title,
    });
  }

  return {
    success,
    error,
  };
}
