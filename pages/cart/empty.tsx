import { useContext, useEffect } from 'react';;
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';

const EmptyCartPage = () => {
    const {replace} = useRouter();
    const {cart} = useContext(CartContext);
    useEffect(() => {
        if(cart.length > 0) {
            replace('/cart');
        }
    }, [cart]);

    if(cart.length > 0) {
        return (
            <ShopLayout title='Empty Cart' pageDescription='Shopping cart is empty'>
                <FullScreenLoading />
            </ShopLayout>
        )
    }
    return (
        <ShopLayout title='Empty Cart' pageDescription='Shopping cart is empty'>
            <Box 
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{
                    flexDirection: {
                        xs: 'column',
                        sm: 'row'
                    }
                }}
            >
                <RemoveShoppingCartOutlined sx={{fontSize: 150}}/>
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography fontSize={18}>Your shopping cart is empty</Typography>
                    <NextLink href='/' passHref>
                        <Link color='secondary'>
                            <Typography 
                                variant='h6' 
                                component='p'
                                fontSize={26}
                            >
                                Go to the home page
                            </Typography>
                        </Link>
                    </NextLink>
                </Box>
                
            </Box>
        </ShopLayout>
    )
}
export default EmptyCartPage