import { Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout } from '../../components/layouts/ShopLayout';

const AdressPage = () => {
  return (
    <ShopLayout title='Address' pageDescription='Confirm shipping address'>
        <Typography variant='h1' component='h1' sx={{mb: 3}}>Address</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField label='First name' fullWidth/>  
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Last name' fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Street 1' fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Street 2' fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='ZIP Code' fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='City' fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                        label='Country'
                        value={1}
                    >
`                       <MenuItem value={1}>United States</MenuItem>
                        <MenuItem value={2}>Venezuela</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Phone Number' fullWidth/>
            </Grid>
        </Grid>

        <Box sx={{mt: 5}} display='flex' justifyContent='center'>
            <Link href='/checkout/summary'>
                <Button 
                    color='secondary' 
                    className='circular-btn' 
                    size='large'
                    variant='contained'
                >
                    Review purchase
                </Button>
            </Link>
        </Box>
    </ShopLayout>
  )
}
export default AdressPage