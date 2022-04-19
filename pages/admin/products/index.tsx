import NextLink from 'next/link';
import useSWR from 'swr';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { DashboardLayout } from '../../../components/layouts'
import { FullScreenLoading } from '../../../components/ui';
import { iProduct } from '../../../interfaces';

const columns: GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Image',
        renderCell: ({row}: GridValueGetterParams) => (
            <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
                <CardMedia 
                    className='fadeIn'
                    component='img'
                    image={row.img}
                />
            </a>
        )
    },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'inStock', headerName: 'In Stock', width: 100 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'sizes', headerName: 'Sizes', width: 150 },
    {
        field: 'edit',
        headerName: 'Edit',
        renderCell: ({row}: GridValueGetterParams) => (
            <NextLink href={`/admin/products/${row.slug}`} passHref>
                <Link underline='always'>
                    Edit
                </Link>
            </NextLink>
        )
    }
]

const ProductsPage = () => {
    const {data,error} = useSWR<iProduct[]>('/api/admin/products');
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
    const rows = data!.map(product => ({
        id: product._id,
        slug: product.slug,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', ')
    }))
    return (
        <DashboardLayout
            title=' Products'
            subtitle='Products Management'
            icon={<CategoryOutlined />}
        >
            <Box display='flex' justifyContent='end' sx={{mb: 2}}>
                <Button
                    className='circular-btn'
                    startIcon={<AddOutlined />}
                    color='secondary'
                    href='/admin/products/new'
                >
                    Create Product
                </Button>
            </Box>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{height: 650, width: '100%', mt: 1.5}}>
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
export default ProductsPage