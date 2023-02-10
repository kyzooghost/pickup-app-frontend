import { Box, Flex, HStack, Link, IconButton, useDisclosure, useColorModeValue, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NightModeButton } from './';

type LinkInfo = {
  navBarName: string;
  pageName: string;
};

const links: LinkInfo[] = [
  {
    navBarName: 'Classroom view',
    pageName: '/',
  },
  {
    navBarName: 'Change student assignments',
    pageName: 'assign',
  },
  {
    navBarName: 'Add or remove vehicles',
    pageName: 'vehicle',
  },
];

const NavLink = ({ children }: { children: LinkInfo }) => (
  <Link
    px={2}
    py={2}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={children?.pageName}
  >
    {children?.navBarName}
  </Link>
);

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {links.map((link) => (
                <NavLink key={link.pageName}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          {isOpen ? null : <NightModeButton></NightModeButton>}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {links.map((link) => (
                <NavLink key={link.pageName}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
