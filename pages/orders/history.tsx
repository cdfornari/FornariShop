import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts/ShopLayout';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Full Name', width: 300 },
    {
        field: 'paid',
        headerName: 'Paid',
        description: 'Order paid',
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
        description: 'Order details',
        width: 200,
        sortable: false,
        renderCell: (rowData: GridValueGetterParams) => (
            <NextLink href={`/orders/${rowData.row.id}`} passHref>
                <Link underline='always'>
                    View order
                </Link>
            </NextLink>
        )
    }
]
const rows = [
    {id: 1, fullName: 'John Doe', paid: true},
    {id: 2, fullName: 'Jane Doe', paid: false},
    {id: 3, fullName: 'John Doe', paid: true},
    {id: 4, fullName: 'Jane Doe', paid: false},
    {id: 5, fullName: 'John Doe', paid: true},
    {id: 6, fullName: 'Jane Doe', paid: true},
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Order History' pageDescription='Order history'>
        <Typography variant='h1' component='h1' sx={{mb: 2}}>
            Order History
        </Typography>
        <Grid container>
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
export default HistoryPage