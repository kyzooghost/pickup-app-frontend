import { Button, Flex, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const NightModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Button aria-label="Toggle Color Mode" onClick={toggleColorMode} _focus={{ boxShadow: 'none' }} w="fit-content">
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};
