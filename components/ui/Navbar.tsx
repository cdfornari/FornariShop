import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { Close, SearchSharp, ShoppingCartSharp } from '@mui/icons-material';
import { UIContext } from '../../context';
import { ThemeSwitcher } from './';

export const Navbar = () => {
  const {pathname,push} = useRouter();
  const {toggleMenu} = useContext(UIContext);
  const [isSearchVisible,setIsSearchVisible] = useState(false);
  const [searchQuery,setSearchQuery] = useState('');
  const onSearch = () => {
    if(searchQuery.trim().length === 0) return;
    push(`/search/${searchQuery}`);
  }
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
              className='fadeIn'
              sx={{
                display: {
                  xs: 'none',
                  sm: isSearchVisible ? 'none' : 'flex',
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

            <Box flex={{xs: 1, md: 0.68}} />

            <ThemeSwitcher showMedium={!isSearchVisible}/>

            {
              isSearchVisible
              ? 
                <Input
                  autoFocus
                  className='fadeIn'
                  type='text'
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e)=> e.key === 'Enter' && onSearch()}
                  sx={{display: {xs: 'none', sm: 'flex'}}}
                  endAdornment={
                      <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setIsSearchVisible(false)}
                          >
                            <Close />
                          </IconButton>
                      </InputAdornment>
                  }
                />
              :
                <IconButton 
                  sx={{display: {xs: 'none',md: 'block'}}}
                  onClick={()=>setIsSearchVisible(true)}
                >
                  <SearchSharp />
                </IconButton>
            }

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
              onClick={() => {
                setIsSearchVisible(false);
                toggleMenu();
              }}
            >Menu</Button>
        </Toolbar>
    </AppBar>
  )
}