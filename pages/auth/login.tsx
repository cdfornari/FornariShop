import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts';
import NextLink from 'next/link';

const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
        <Box sx={{width: 350, padding: '10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{mb: 0.5}}>
                    <Typography variant='h1' component='h1'>Login</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Email' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Password' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth className='circular-btn' color='secondary'>
                        Enter
                    </Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href='/auth/register' passHref>
                        <Link underline='always'>
                            Don&lsquo;t have an account?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}
export default LoginPage