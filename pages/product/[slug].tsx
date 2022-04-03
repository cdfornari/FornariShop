import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts'
import { initialData } from '../../database/products';
import { ItemCounter, ProductSlideshow, SizeSelector } from '../../components/ui';

const ProductPage = () => {
  return (
    <ShopLayout title={initialData.products[0].title} pageDescription={initialData.products[0].description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            images={initialData.products[0].images}
          />
        </Grid>
        
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            <Typography variant='h1' component='h1'>{initialData.products[0].title}</Typography>
            <Typography variant='subtitle1' component='h2'>$ {initialData.products[0].price}</Typography>

            <Box sx={{my: 2}}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter />
              <SizeSelector  
                //selectedSize={initialData.products[0].sizes[0]}
                sizes={initialData.products[0].sizes}
              />
            </Box>

            <Button color='secondary' className='circular-btn'>
              Add to Cart
            </Button>

            {/* <Chip label='Not Available' color='error' variant='outlined'/> */}

            <Box sx={{mt: 3}}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{initialData.products[0].description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}
export default ProductPage