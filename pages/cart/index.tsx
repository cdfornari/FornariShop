import { Card, CardContent, Grid, Typography, Divider, Box, Button, Link } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts'

const CartPage = () => {
  return (
    <ShopLayout title='Shopping Cart - 3' pageDescription='Shopping Cart'>
        <Typography variant='h1' component='h1' sx={{mb: 2}}>
            Shopping Cart
        </Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
               <CartList  editable/>
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Order</Typography>
                        <Divider sx={{my: 1}}/>
                        
                        <OrderSummary />

                        <Box sx={{mt: 3}}>
                            <Link href='/checkout/address'>
                                <Button 
                                    color='secondary'
                                    className='circular-btn'
                                    fullWidth
                                >
                                    Checkout
                                </Button>
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}
export default CartPage