import { FC, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '../../context';
import { formatCurrency } from '../../utils';
import { iOrderSummary } from '../../interfaces';

interface Props {
    orderSummary?: iOrderSummary;
}

export const OrderSummary: FC<Props> = ({orderSummary}) => {
    const {summary} = useContext(CartContext);
    const summaryToShow = orderSummary ? orderSummary : summary;
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography fontWeight={500}>Product count</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{summaryToShow.productCount}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography fontWeight={500}>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{formatCurrency(summaryToShow.subtotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography fontWeight={500}>Tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE)*100}%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{formatCurrency(summaryToShow.tax)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{mt: 2}}>
                <Typography variant='subtitle1'>Total</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{mt: 2}}>
                <Typography>{formatCurrency(summaryToShow.total)}</Typography>
            </Grid>
        </Grid>
    )
}