import { NextPage,GetStaticPaths,GetStaticProps } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts'
import { ItemCounter, ProductSlideshow, SizeSelector } from '../../components/ui';
import { dbProducts } from '../../database';
import { iProduct } from '../../interfaces';

interface Props {
  product: iProduct;
}

const ProductPage: NextPage<Props> = ({product}) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            images={product.images}
          />
        </Grid>
        
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>$ {product.price}</Typography>

            <Box sx={{my: 2}}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter />
              <SizeSelector  
                //selectedSize={initialData.products[0].sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            <Button color='secondary' className='circular-btn'>
              Add to Cart
            </Button>

            {/* <Chip label='Not Available' color='error' variant='outlined'/> */}

            <Box sx={{mt: 3}}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllProductSlugs();
  return {
    paths: slugs.map(slug => ({params: {slug}})),
    fallback: "blocking"
  }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const {slug = ''} = ctx.params as {slug: string};
  const product = await dbProducts.getProductBySlug(slug);
  if(!product) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }
  return {
    props: {
      product
    },
    revalidate: 60*60*24
  }
}

/* import { GetServerSideProps } from 'next'
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {slug = ''} = ctx.params as {slug: string};
  const product = await dbProducts.getProductBySlug(slug);
  console.log(product);
  if(!product) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }
  return {
    props: {
      product
    }
  }
} */


export default ProductPage