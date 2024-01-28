import {
  Box,
  Container,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { FaBars } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

import { Guard } from "~/hocs/guard";
import { auth } from "~/infra/fir";

const MeLayout = Guard("AfterAuth", function () {
  return (
    <Box>
      <Box py="2">
        <Container maxW="lg">
          <Flex justifyContent="space-between" alignItems="center">
            <Box fontWeight="bold" fontSize="xl">
              Todo app
            </Box>
            <Box>
              <Menu placement="bottom-end">
                <MenuButton as={IconButton} icon={<FaBars />} />
                <MenuList>
                  <MenuItem onClick={() => signOut(auth)}>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container maxW="lg">
        <Outlet />
      </Container>
    </Box>
  );
});

export default MeLayout;
