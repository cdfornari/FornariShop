import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { DashboardLayout } from '../../../components/layouts'
import { FullScreenLoading } from '../../../components/ui';
import { iOrder, iUser } from '../../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'total', headerName: 'Total', width: 100 },
    { 
        field: 'status', 
        headerName: 'Status', 
        renderCell: ({row}: GridValueGetterParams) => (
            row.isPaid
            ? <Chip variant='outlined' label='Paid' color='success' />
            : <Chip variant='outlined' label='Pending' color='error' />
        )
    },
    { field: 'productCount', headerName: 'Number of Products', align: 'center', width: 150 },
    { 
        field: 'view', 
        headerName: 'Go to Order', 
        renderCell: ({row}: GridValueGetterParams) => (
            <a 
                href={`/admin/orders/${row.id}`} 
                target='_blank' 
                rel='noreferrer'
                style={{
                    color: '#3f51b5'
                }}
            >
                View Order
            </a>
        )
    },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
]

const OrdersPage = () => {
    const {data,error} = useSWR<iOrder[]>('/api/admin/orders');
    if(!data && !error){
        return (
            <DashboardLayout 
                title='Loading' 
                subtitle='Table is loading'
            >
                <FullScreenLoading />
            </DashboardLayout>
        )
    }
    const rows = data!.map(order => ({
        id: order._id,
        email: (order.user as iUser).email,
        name: (order.user as iUser).name,
        total: order.summary.total,
        isPaid: order.isPaid,
        productCount: order.summary.productCount,
        createdAt: order.createdAt
    }))
    return (
        <DashboardLayout
            title=' Orders'
            subtitle='Orders Management'
            icon={<ConfirmationNumberOutlined />}
        >
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
        </DashboardLayout>
    ) 
}
export default OrdersPage