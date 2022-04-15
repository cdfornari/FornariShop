import { GetServerSideProps, NextPage } from 'next'
import { Typography, Grid, Card, CardContent, Divider, Box, Chip } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { CartList, OrderSummary } from '../../../components/cart'
import { dbOrders } from '../../../database'
import { iOrder } from '../../../interfaces';
import { DashboardLayout } from '../../../components/layouts';

interface Props {
    order: iOrder
}

const OrderPage: NextPage<Props> = ({order}) => {
    return (
        <DashboardLayout 
            title=' Order Resume' 
            subtitle={'Order ' + order._id}
            icon={<AirplaneTicketOutlined />}
        >
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
                                    <Chip 
                                        sx={{my: 2}}
                                        label='Pending'
                                        variant='outlined'
                                        color='error'
                                        icon={<CreditCardOffOutlined/>}
                                    />
                            }
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id = '' } = ctx.query;
    const order = await dbOrders.getOrderById(id.toString());
    if(!order) {
        return {
            redirect: {
                destination: '/admin/orders',
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