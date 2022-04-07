import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ItemCounter } from '../ui';

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({editable = false}) => {
    const {cart,updateProductQuantity,removeProduct} = useContext(CartContext);
    return (
        <>
            {
                cart.map(product => (
                    <Grid container spacing={2} key={product.slug + product.size} sx={{mb:1}}>
                        <Grid item xs={3} className='fadeIn'>
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
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
                                    Size: <strong>{product.size}</strong>
                                </Typography>
                                {
                                    editable
                                    ?   <ItemCounter 
                                            count={product.quantity} 
                                            maxValue={product.inStock} 
                                            onChange={(value: number) => updateProductQuantity({...product, quantity: value})} />
                                    :   <Typography variant='body1'>Quantity: <strong>{product.quantity}</strong></Typography>
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
                                        onClick={() => removeProduct(product)}
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