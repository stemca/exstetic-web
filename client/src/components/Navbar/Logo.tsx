import { Image, Box, Text } from '@chakra-ui/react';

interface Props {
  w: string;
  color: object;
}

const Logo = (props: Props) => {
  return (
    <Box {...props}>
      <Text fontSize='lg' fontWeight='bold'>
        Logo
      </Text>
    </Box>
  );
};

export default Logo;
