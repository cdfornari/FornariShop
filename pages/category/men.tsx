import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'


const MenPage: NextPage = () => {
  const {products,isLoading, isError} = useProducts('/products?gender=men')
  if (isError) return <div>failed to load</div>
  return (
    <ShopLayout title='Fornari Shop - Men' pageDescription='Products for men'>
      <Typography variant='h1' component='h1'>Fornari Shop</Typography>
      <Typography variant='h2' sx={{mb: 2.5}}>Men</Typography>
      {
        isLoading 
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default MenPage
