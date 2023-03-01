import { Box, Flex, Button, Container } from "@chakra-ui/react";
import Link from "next/link";
import { Logo } from "../../svg/Logo";

const Header: React.FC = () => {
  return (
    <Box>
      <Box bg="primary" py={3} color="secondary">
        <Container size={["base", "sm", "md", "lg", "xl"]}>
          <Flex justifyContent="space-between" alignItems="center">
            <Link href="/">
              <Logo w={24} />
            </Link>
            <Flex>
              <Link href="/sign-in">
                <Button
                  _hover={{ backgroundColor: "secondary", color: "primary" }}
                  bg="primary"
                  color="secondary"
                  mr={2}
                  size={["sm", "md", "lg"]}
                >
                  SIGN IN
                </Button>
              </Link>
              <Link href="/joining-as">
                <Button
                  _hover={{ backgroundColor: "secondary" }}
                  bg="secondary"
                  color="primary"
                  size={["sm", "md", "lg"]}
                >
                  SIGN UP
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
