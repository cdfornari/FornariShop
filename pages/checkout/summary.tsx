import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from '@mui/material'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context/cart/CartContext';
import { FullScreenLoading } from '../../components/ui';

const SummaryPage = () => {
    const {push,replace} = useRouter();
    const {address,summary,createOrder} = useContext(CartContext);

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(!address){
            push('/checkout/address')
        }
    }, [])

    const onCreateOrder = async() => {
        setIsPosting(true);
        const {hasError,message} = await createOrder();
        if(hasError){
            setIsPosting(false);
            setErrorMessage(message);
            return;
        }
        replace(`/orders/${message}`);
    }

    if(!address || isPosting){
        return (
            <ShopLayout title={'Order Summary'} pageDescription='Order summary'>
                <FullScreenLoading/>
            </ShopLayout>
        )
    }
    const {firstName,lastName,city,country,address: address1,address2,zip,phone} = address;
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
                            <Typography variant='h2'>
                                {`Order (${summary.productCount} ${summary.productCount > 1 ? 'products' : 'product'})`}
                            </Typography>
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

                            <Typography variant='body1'>{`${firstName} ${lastName}`}</Typography>
                            <Typography variant='body1'>{address1}</Typography>
                            {address2 && <Typography variant='body1'>{address2}</Typography>}
                            <Typography variant='body1'>{city}</Typography>
                            <Typography variant='body1'>{zip}</Typography>
                            <Typography variant='body1'>{country}</Typography>
                            <Typography variant='body1'>{phone}</Typography>
                            <Divider sx={{my: 1}}/>

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                            
                            <OrderSummary />

                            <Box sx={{mt: 3}} display='flex' flexDirection='column'>
                                <Button 
                                    color='secondary'
                                    className='circular-btn'
                                    variant='contained'
                                    fullWidth
                                    onClick={onCreateOrder}
                                    disabled={isPosting}
                                >
                                    Confirm Order
                                </Button>
                                <Chip 
                                    color='error'
                                    label={errorMessage}
                                    variant='outlined'
                                    sx={{mt: 2, display: errorMessage ? 'flex' : 'none'}}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}
export default SummaryPage