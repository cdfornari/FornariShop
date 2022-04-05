import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { FC } from 'react';
import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';

const products = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]
interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({editable = false}) => {
  return (
    <>
        {
            products.map(product => (
                <Grid container spacing={2} key={product.slug} sx={{mb:1}}>
                    <Grid item xs={3}>
                        <NextLink href={`/product/${product.slug}`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={`/products/${product.images[0]}`}
                                        component='img'
                                        sx={{borderRadius: '5px'}}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='h6'>{product.title}</Typography>
                            <Typography variant='body1'>
                                Size: <strong>M</strong>
                            </Typography>
                            {
                                editable
                                ? <ItemCounter />
                                : <Typography variant='body1'>Quantity: <strong>1</strong></Typography>
                                
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' flexDirection='column' alignItems='center'>
                        <Typography variant='subtitle1'>$ {product.price}</Typography>
                        {
                            editable && (
                                <Button
                                    color='error'
                                    variant='text'
                                >
                                    Delete
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}