import { extendTheme } from "@chakra-ui/react";

export const extendedTheme = extendTheme({
  components: {
    Button: {
      sizes: {
        md: {
          h: "12",
        },
      },
    },
  },
});
