import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { SearchSharp, ShoppingCartSharp } from '@mui/icons-material';
import { ThemeSwitcher } from './';

export const Navbar = () => {
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
                    <Button>Men</Button>
                  </Link>
              </NextLink>
              <NextLink href='/category/women' passHref>
                  <Link display='flex' alignItems='center'>
                    <Button>Women</Button>
                  </Link>
              </NextLink>
              <NextLink href='/category/kids' passHref>
                  <Link display='flex' alignItems='center'>
                    <Button>Kids</Button>
                  </Link>
              </NextLink>
            </Box>

            <Box flex={0.7} />

            <ThemeSwitcher showSmall={false}/>

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

            <Button>Menu</Button>
        </Toolbar>
    </AppBar>
  )
}