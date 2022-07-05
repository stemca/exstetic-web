import { ReactNode } from 'react';
import { Box, Link, Text, Stack, Button } from '@chakra-ui/react';

interface ItemProps {
  children: ReactNode;
  isLast?: boolean;
  to: string;
}

interface LinkProps {
  isOpen: boolean;
}

const MenuItem = ({ children, isLast, to = '/', ...rest }: ItemProps) => {
  return (
    <Link href={to}>
      <Text display='block' {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }: LinkProps) => {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to='/'>Home</MenuItem>
        <MenuItem to='/how'>How It works </MenuItem>
        <MenuItem to='/faetures'>Features </MenuItem>
        <MenuItem to='/pricing'>Pricing </MenuItem>
        <MenuItem to='/register' isLast>
          <Button
            size='sm'
            rounded='md'
            color={['primary.500', 'primary.500', 'white', 'white']}
            bg={['white', 'white', 'primary.500', 'primary.500']}
            _hover={{
              bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600'],
            }}
          >
            Create Account
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

export default MenuLinks;
