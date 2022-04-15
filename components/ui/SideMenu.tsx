import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UIContext } from '../../context'
import { ThemeSwitcher } from './ThemeSwitcher';


export const SideMenu = () => {
    const {push,asPath} = useRouter();
    const {isLoggedIn,user,logout} = useContext(AuthContext)
    const {isMenuOpen,toggleMenu} = useContext(UIContext);
    const [searchQuery,setSearchQuery] = useState('');
    const navigateTo = (path: string) => {
        toggleMenu();
        push(path);
    }
    const onSearch = () => {
        if(searchQuery.trim().length === 0) return;
        navigateTo(`/search/${searchQuery}`);
    }
    return (
        <Drawer
            open={ isMenuOpen }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={ toggleMenu }
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            type='text'
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e)=> e.key === 'Enter' && onSearch()}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={onSearch}
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {
                        isLoggedIn &&
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </ListItem>
                            <ListItem button onClick={() => navigateTo('/orders/history')}>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'My Orders'} />
                            </ListItem>
                        </>
                    }

                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={()=>navigateTo('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Men'} />
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={()=>navigateTo('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Women'} />
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={()=>navigateTo('/category/kid')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Kids'} />
                    </ListItem>

                    {
                        isLoggedIn 
                        ?                    
                            <ListItem 
                                button
                                onClick={logout}
                            >
                                <ListItemIcon>
                                    <LoginOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Sign Out'} />
                            </ListItem>
                        :
                            <ListItem 
                                button 
                                onClick={()=>navigateTo(`/auth/login?page=${asPath}`)}
                            >
                                <ListItemIcon>
                                    <VpnKeyOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Login'} />
                            </ListItem>
                    }

                    {
                        user?.role === 'admin' &&
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem 
                                button
                                onClick={()=>navigateTo('/admin')}
                            >
                                <ListItemIcon>
                                    <DashboardOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Products'} />
                            </ListItem>
                            <ListItem 
                                button
                                onClick={()=>navigateTo('/admin/orders')}
                            >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Orders'} />
                            </ListItem>
                            <ListItem 
                                button
                                onClick={()=>navigateTo('/admin/users')}
                            >
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Users'} />
                            </ListItem>
                        </>
                    }

                    <ListItem sx={{mt: 1, ml: 3}}>
                        <ThemeSwitcher showSmall/>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}