import { FC, useMemo, useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { iProduct } from '../../interfaces/product';

interface Props {
    product: iProduct;
}

export const ProductCard: FC<Props> = ({product}) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const productImage = useMemo(() => (
        isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`
    ), [isHovered, product.images]);
    useEffect(() => {
        setTimeout(() => {
            if(!isImgLoaded)
            setIsImgLoaded(true);
        }, 800);
    }, []);
    return (
        <Grid item 
            xs={6} 
            sm={4}
        >
            <div    
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Card>
                    <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                        <Link>
                            <CardActionArea>
                                <CardMedia
                                    className='fadeIn'
                                    component='img'
                                    image={productImage}
                                    alt={product.title}
                                    onLoad={() => setIsImgLoaded(true)}
                                />
                            </CardActionArea>
                        </Link>
                    </NextLink>
                </Card>
                    <Box 
                        className='fadeIn'
                        sx={{
                            display: isImgLoaded ? 'block' : 'none',
                            mt: 1
                        }} 
                    >
                        <Typography fontWeight={700}>{product.title}</Typography>
                        <Typography fontWeight={500}>$ {product.price}</Typography>
                    </Box>
            </div>
        </Grid>
    )
}