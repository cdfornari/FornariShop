import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { initialData } from '../database/products';
import { ProductList } from '../components/products/ProductList';

const Home: NextPage = () => {
  return (
    <ShopLayout title='Fornari Shop' pageDescription='Best clothing shop'>
      <Typography variant='h1' component='h1'>Fornari Shop</Typography>
      <Typography variant='h2' sx={{mb: 1}}>All the products</Typography>
      <ProductList products={initialData.products as any}/>
    </ShopLayout>
  )
}

export default Home
