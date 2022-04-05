import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from '@mui/material'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'

const SummaryPage = () => {
  return (
    <ShopLayout title='Order Summary' pageDescription='Order summary'>
        <Typography variant='h1' component='h1' sx={{mb: 2}}>
          Order Summary
        </Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
               <CartList />
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Order (3 products)</Typography>
                        <Divider sx={{my: 1}}/>

                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant='subtitle1'>Shipping address</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display='flex' justifyContent='end'>
                                    <NextLink href='/checkout/address' passHref>
                                        <Link underline='always'>
                                            Edit
                                        </Link>
                                    </NextLink>
                                </Box>
                            </Grid>
                        </Grid>

                        <Typography variant='body1'>Carlos Fornari</Typography>
                        <Typography variant='body1'>28427 Flint Hil Dr.</Typography>
                        <Typography variant='body1'>Houston TX</Typography>
                        <Typography variant='body1'>77449</Typography>
                        <Typography variant='body1'>United States</Typography>
                        <Typography variant='body1'>+1 (281)5370057</Typography>
                        <Divider sx={{my: 1}}/>

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Edit
                                </Link>
                            </NextLink>
                        </Box>
                        
                        <OrderSummary />

                        <Box sx={{mt: 3}}>
                            <Button 
                                color='secondary'
                                className='circular-btn'
                                variant='contained'
                                fullWidth
                            >
                                Confirm Order
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}
export default SummaryPage