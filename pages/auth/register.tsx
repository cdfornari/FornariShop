import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts';
import NextLink from 'next/link';

const RegisterPage = () => {
  return (
    <AuthLayout title='Register'>
        <Box sx={{width: 350, padding: '10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{mb: 0.5}}>
                    <Typography variant='h1' component='h1'>Create account</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Name' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Email' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Password' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth className='circular-btn' color='secondary'>
                        Register
                    </Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href='/auth/login' passHref>
                        <Link underline='always'>
                            Already have an account?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}
export default RegisterPage