import { Box, Center, Image } from '@chakra-ui/react';

const Preloader = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="black"
      zIndex={9999}
    >
      <Center height="100vh">
        <Image src="/starwars.gif" alt="Star Wars Logo" />
      </Center>
    </Box>
  );
};

export default Preloader;