import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'


const WomenPage: NextPage = () => {
  const {products,isLoading, isError} = useProducts('/products?gender=women')
  if (isError) return <div>failed to load</div>
  return (
    <ShopLayout title='Fornari Shop - Women' pageDescription='Products for women'>
      <Typography variant='h1' component='h1'>Fornari Shop</Typography>
      <Typography variant='h2' sx={{mb: 2.5}}>Women</Typography>
      {
        isLoading 
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default WomenPage
