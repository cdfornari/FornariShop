import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '../../context';
import { formatCurrency } from '../../utils';

export const OrderSummary = () => {
    const {summary} = useContext(CartContext);
    const {total, subtotal, tax, productCount} = summary;
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography fontWeight={500}>Product count</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{productCount}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography fontWeight={500}>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{formatCurrency(subtotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography fontWeight={500}>Tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE)*100}%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{formatCurrency(tax)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{mt: 2}}>
                <Typography variant='subtitle1'>Total</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{mt: 2}}>
                <Typography>{formatCurrency(total)}</Typography>
            </Grid>
        </Grid>
    )
}