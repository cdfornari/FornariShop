import { useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { SearchSharp, ShoppingCartSharp } from '@mui/icons-material';
import { UIContext } from '../../context';
import { ThemeSwitcher } from './';

export const Navbar = () => {
  const {pathname} = useRouter();
  const {toggleMenu} = useContext(UIContext);
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                  <Typography variant='h6'>Fornari |</Typography>
                  <Typography sx={{ml: 0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1} />

            <Box 
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex'
                }
              }}>
              <NextLink href='/category/men' passHref>
                  <Link display='flex' alignItems='center'>
                    <Button color={pathname.includes('/men') ? 'primary' : 'info'}>Men</Button>
                  </Link>
              </NextLink>
              <NextLink href='/category/women' passHref>
                  <Link display='flex' alignItems='center'>
                    <Button color={pathname.includes('/women') ? 'primary' : 'info'}>Women</Button>
                  </Link>
              </NextLink>
              <NextLink href='/category/kid' passHref>
                  <Link display='flex' alignItems='center'>
                    <Button color={pathname.includes('/kid') ? 'primary' : 'info'}>Kids</Button>
                  </Link>
              </NextLink>
            </Box>

            <Box flex={0.7} />

            <ThemeSwitcher showMedium/>

            <IconButton>
              <SearchSharp />
            </IconButton>

            <NextLink href='/cart' passHref>
              <Link>
                <IconButton>
                  <Badge badgeContent={2} color='secondary'>
                    <ShoppingCartSharp />
                  </Badge>
                </IconButton>
              </Link>
            </NextLink>

            <Button
              onClick={toggleMenu}
            >Menu</Button>
        </Toolbar>
    </AppBar>
  )
}