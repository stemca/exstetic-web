import { Link, Box, Flex, Text, Button, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import NavbarContainer from './NavbarContainer';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import MenuLinks from './MenuLinks';

interface Props {}

const Navbar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavbarContainer {...props}>
      <Logo
        w='100px'
        color={['white', 'white', 'primary.500', 'primary.500']}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavbarContainer>
  );
};

export default Navbar;
