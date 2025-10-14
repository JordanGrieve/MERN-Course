import { Box, Container, Flex } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Container maxW={"900px"}>
      <Box px={4} my={4} borderRadius={5}>
        <Flex h="16" alignItems={"center"} justify={"space-between"}>
          {/*  Left Side */}
          LEf
        </Flex>
        <Flex
          alignItems={"center"}
          justify={"space-between"}
          gap={3}
          display={{ base: "none", sm: "flex" }}
        >
          RIGFHT
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
