import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
} from "react-router-dom";

type AppLinkProps = ChakraLinkProps & ReactRouterLinkProps;

export function AppLink(props: AppLinkProps) {
  return <ChakraLink as={ReactRouterLink} {...props} />;
}
