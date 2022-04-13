import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, Grid, Typography, Divider, Box, Button, Link } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context';
import { FullScreenLoading } from '../../components/ui';

const CartPage = () => {
    const {replace} = useRouter();
    const {summary,cart} = useContext(CartContext);
    const {productCount} = summary;

    useEffect(() => {
        if(cart.length === 0){
            replace('/cart/empty');
        }
    }, [cart]);

    if(cart.length === 0){
        return (
            <ShopLayout title={'Shopping Cart - ' + productCount} pageDescription='Shopping Cart'>
                <FullScreenLoading/>
            </ShopLayout>
        )
    }
    return (
        <ShopLayout title={'Shopping Cart - ' + productCount} pageDescription='Shopping Cart'>
            <Typography variant='h1' component='h1' sx={{mb: 2}}>
                Shopping Cart
            </Typography>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                <CartList editable/>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Order</Typography>
                            <Divider sx={{my: 1}}/>
                            
                            <OrderSummary />

                            <Box sx={{mt: 3}}>
                                <Button 
                                    color='secondary'
                                    className='circular-btn'
                                    variant='contained'
                                    href='/checkout/address'
                                    fullWidth
                                >
                                    Checkout
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default CartPage