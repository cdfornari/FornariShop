import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'
import { UIContext } from '../../context';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

export const AdminNavbar = () => {
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

            <ThemeSwitcher showMedium/>

            <Button
              onClick={() => toggleMenu()}
            >Menu</Button>

        </Toolbar>
    </AppBar>
  )
}