import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products/ProductList';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';

const HomePage: NextPage = () => {
  const {products,isLoading, isError} = useProducts('/products')
  if (isError) return <div>failed to load</div>
  return (
    <ShopLayout title='Fornari Shop' pageDescription='Best clothing shop'>
      <Typography variant='h1' component='h1'>Fornari Shop</Typography>
      <Typography variant='h2' sx={{mb: 2.5}}>All the products</Typography>
      {
        isLoading 
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default HomePage
