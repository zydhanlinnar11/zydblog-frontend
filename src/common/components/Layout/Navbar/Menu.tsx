import { useUser } from '@/common/providers/UserProvider'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  forwardRef,
  ButtonProps,
  Button,
} from '@chakra-ui/react'
import Link from 'next/link'

const Menu = () => {
  const { user } = useUser()

  return (
    <ChakraMenu>
      <Box as="li">
        <MenuButton as={OptionButton}>
          <HamburgerIcon />
        </MenuButton>
      </Box>
      <MenuList>
        {!user && (
          <Link href={'/auth/login'}>
            <MenuItem>Login</MenuItem>
          </Link>
        )}
        {user && (
          <Link href={'/auth/logout'}>
            <MenuItem>Logout</MenuItem>
          </Link>
        )}
      </MenuList>
    </ChakraMenu>
  )
}

const OptionButton = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button colorScheme="gray" size={'sm'} ref={ref} {...props} />
))

export default Menu
