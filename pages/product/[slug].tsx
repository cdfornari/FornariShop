import { useContext, useState } from 'react';
import { NextPage,GetStaticPaths,GetStaticProps } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts'
import { ItemCounter, ProductSlideshow, SizeSelector } from '../../components/ui';
import { dbProducts } from '../../database';
import { iProduct, iSize } from '../../interfaces';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';

interface Props {
  product: iProduct;
}

const ProductPage: NextPage<Props> = ({product}) => {
  const router = useRouter();
  const {addProductToCart} = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<iSize>();
  const addToCart = () => {
    if(!size) return;
    addProductToCart({
      ...product,
      size,
      quantity,
      image: product.images[0]
    });
    router.push('/cart');
  }
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
              <ItemCounter 
                count={quantity}
                maxValue={product.inStock < 10 ? product.inStock : 10}
                onChange={setQuantity}
              />
              <SizeSelector  
                selectedSize={size}
                sizes={product.sizes}
                onSelectSize={setSize}
              />
            </Box>

            {
              product.inStock > 0 
              ? <Button 
                  className='circular-btn'
                  color='secondary'
                  onClick={addToCart} 
                >
                  {
                    size 
                    ? 'Add to Cart'
                    : 'Select Size'
                  }
                </Button>
              : <Chip label='Out of stock' color='error' variant='outlined'/>
            }

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
import { CartContext } from '../../context/cart/CartContext';
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