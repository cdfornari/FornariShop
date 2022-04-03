import { FC } from 'react'
import { Grid } from '@mui/material'
import { iProduct } from '../../interfaces'
import { ProductCard } from '.'

interface Props {
    products: iProduct[];
}

export const ProductList: FC<Props>= ({products}) => {
  return (
    <Grid container spacing={4}>
        {
            products.map(product => (
                <ProductCard key={product.slug} product={product} />
            ))
        }
    </Grid>
  )
}