import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Typography, Grid, Card, CardContent, Divider, Box, Chip, Button, CircularProgress } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { dbOrders } from '../../database'
import { iOrder } from '../../interfaces';
import { api } from '../../api';

type OrderResponseBody = {
    id: string;
    status: "COMPLETED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED" | "PAYER_ACTION_REQUIRED";
}

interface Props {
    order: iOrder
}

const OrderPage: NextPage<Props> = ({order}) => {
    const {reload} = useRouter();
    const [isPaying, setIsPaying] = useState(false)
    const onOrderCompleted = async(details: OrderResponseBody) => {
        if(details.status !== "COMPLETED") return alert('Payment Failed');
        setIsPaying(true);
        try {
            const {data} = await api.post('/orders/pay', {
                orderId: order._id,
                transactionId: details.id
            })
            reload();
        } catch (error) {
            console.log(error);
            alert('Payment Failed');
            setIsPaying(false);
        }
    }
    return (
        <ShopLayout title='Order Resume' pageDescription='Order resume'>
            <Typography variant='h1' component='h1' sx={{mb: 2}}>
                Order {order._id}
            </Typography>

            {
                order.isPaid 
                ?
                    <Chip 
                        label='Paid'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined/>}
                        sx={{mb: 2}}
                    />
                :
                    <Chip 
                        label='Pending payment'
                        variant='outlined'
                        color='error'
                        icon={<CreditCardOffOutlined/>}
                        sx={{mb: 2}}
                    />
            }
            

            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>
                                Order ({order.summary.productCount} {order.summary.productCount > 1 ? 'products' : 'product'})
                            </Typography>
                            <Divider sx={{my: 1}}/>

                            <Typography variant='subtitle1'>Shipping address</Typography>

                            <Typography variant='body1'>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</Typography>
                            <Typography variant='body1'>{order.shippingAddress.address}</Typography>
                            {order.shippingAddress.address2 && <Typography variant='body1'>{order.shippingAddress.address2}</Typography>}
                            <Typography variant='body1'>{order.shippingAddress.city}</Typography>
                            <Typography variant='body1'>{order.shippingAddress.zip}</Typography>
                            <Typography variant='body1'>{order.shippingAddress.country}</Typography>
                            <Typography variant='body1'>{order.shippingAddress.phone}</Typography>
                            <Divider sx={{my: 1}}/>
                            
                            <OrderSummary orderSummary={order.summary}/>

                            <Box sx={{mt: 3}} display='flex' flexDirection='column'>
                                <Box 
                                    display={isPaying ? 'flex' : 'none'}
                                    justifyContent='center' 
                                    className='fadeIn'
                                >
                                    <CircularProgress />
                                </Box>
                                <Box
                                    display={isPaying ? 'none' : 'flex'}
                                    flex={1}
                                    flexDirection='column'
                                >
                                    {
                                        order.isPaid 
                                        ?
                                            <Chip 
                                                sx={{my: 2}}
                                                label='Paid'
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditScoreOutlined/>}
                                            />
                                        :
                                            <PayPalButtons 
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: order.summary.total.toString()
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order!.capture().then((details) => {
                                                        onOrderCompleted(details);
                                                    });
                                                }}
                                            />
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id='' } = ctx.query;
    const session: any = await getSession({req: ctx.req});
    if(!session) {
        return {
            redirect: {
                destination: `/auth/login?page=/orders/${id}`,
                permanent: false
            }
        }
    }
    const order = await dbOrders.getOrderById(id.toString());
    if(!order || order.user !== session.user._id) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }
    return {
        props: {
            order
        }
    }
}

export default OrderPage