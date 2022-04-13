import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { iOrder } from '../../interfaces';
import { dbOrders } from '../../database';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Full Name', width: 300 },
    {
        field: 'paid',
        headerName: 'Paid',
        width: 200,
        renderCell: (rowData: GridValueGetterParams) => (
            rowData.row.paid 
            ? <Chip color='success' label='Paid' variant='outlined'/>
            : <Chip color='error' label='Pending' variant='outlined'/>
        )
    },
    {
        field: 'Order',
        headerName: 'Order',
        width: 200,
        sortable: false,
        renderCell: (rowData: GridValueGetterParams) => (
            <NextLink href={`/orders/${rowData.row.orderId}`} passHref>
                <Link underline='always'>
                    View order
                </Link>
            </NextLink>
        )
    }
]

interface Props {
    orders: iOrder[];
}

const HistoryPage: NextPage<Props> = ({orders}) => {
    const rows = orders.map((order,i) => ({
        id: i + 1,
        fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        paid: order.isPaid,
        orderId: order._id
    }))
    return (
        <ShopLayout title='Order History' pageDescription='Order history'>
            <Typography variant='h1' component='h1' sx={{mb: 2}}>
                Order History
            </Typography>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session: any = await getSession({req: ctx.req});
    if(!session){
        return {
            redirect: {
                destination: '/auth/login?page=orders/history',
                permanent: false
            }
        }
    }
    const id = session.user._id;
    const orders = await dbOrders.getOrdersByUserId(id);
    return {
        props: {
            orders
        }
    }
}

export default HistoryPage