import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ItemCounter } from '../ui';
import { iCartProduct, iOrderItem } from '../../interfaces';

interface Props {
    editable?: boolean;
    products?: iOrderItem[];
}

export const CartList: FC<Props> = ({editable = false, products}) => {
    const {cart,updateProductQuantity,removeProduct} = useContext(CartContext);
    const productsToShow: any = products ? products : cart;
    return (
        <>
            {
                productsToShow.map((product: iCartProduct) => (
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
                                    editable && !products
                                    ?   <ItemCounter 
                                            count={product.quantity} 
                                            maxValue={product.inStock || 10} 
                                            onChange={(value: number) => updateProductQuantity({...product, quantity: value} as iCartProduct)} />
                                    :   <Typography variant='body1'>Quantity: <strong>{product.quantity}</strong></Typography>
                                } 
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' flexDirection='column' alignItems='center'>
                            <Typography variant='subtitle1'>$ {product.price}</Typography>
                            {
                                editable && !products &&(
                                    <Button
                                        color='error'
                                        variant='text'
                                        onClick={() => removeProduct(product as iCartProduct)}
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