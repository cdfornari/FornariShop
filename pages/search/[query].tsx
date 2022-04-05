import { Box, Typography } from '@mui/material'
import type { NextPage,GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { dbProducts } from '../../database'
import { iProduct } from '../../interfaces'

interface Props {
    products: iProduct[];
    query: string;
    foundProducts: boolean;
}

const HomePage: NextPage<Props> = ({products, query,foundProducts}) => {
    return (
        <ShopLayout title={'Fornari Shop - search: ' + query} pageDescription={`searching ${query} products`}>
        <Typography variant='h1' component='h1'>Fornari Shop</Typography>
        <Typography variant='h2' sx={{mb: foundProducts ? 2.5 : 1}}>Search: {query}</Typography>
        {
            !foundProducts &&
            <>
                <Typography variant='h6'>We did not find any product</Typography>
                <Typography variant='body1' sx={{mb: 3}}>Other products that may interest you:</Typography>
            </>
        }
        <ProductList products={products} />
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {query = ''} = ctx.params as {query: string};
    if(query.trim().length === 0){
        return {
            redirect: {
                destination: '/404',
                permanent: true
            }
        }
    }
    let products = await dbProducts.searchProducts(query);
    const foundProducts = products.length > 0;
    //TODO: suggested products
    if(products.length === 0){
        products = await dbProducts.getAllProducts();
    }
    return {
        props: {
            products,
            query,
            foundProducts
        }
    }
}

export default HomePage
