import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography fontWeight={500}>Products count</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>3</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography fontWeight={500}>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>$ {155.62}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography fontWeight={500}>Tax (15%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>$ {20.41}</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt: 2}}>
            <Typography variant='subtitle1'>Total</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end' sx={{mt: 2}}>
            <Typography>$ {176.03}</Typography>
        </Grid>
    </Grid>
  )
}