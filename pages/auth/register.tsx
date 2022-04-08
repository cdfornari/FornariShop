import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import NextLink from 'next/link';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
    name: string,
    email: string,
    password: string,
};

const RegisterPage = () => {
    const {replace} = useRouter();
    const { register: registerUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegister = async (formValues: FormData) => {
        setShowError(false);
        const {hasError,message} = await registerUser(formValues.name,formValues.email,formValues.password)
        if(hasError){
            setErrorMessage(message!);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        replace('/');
    }

    return (
        <AuthLayout title='Register'>
            <form onSubmit={handleSubmit(onRegister)} noValidate>
                <Box sx={{width: 350, padding: '10px 20px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{mb: 0.5}}>
                            <Typography variant='h1' component='h1'>Create account</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label='Name' 
                                fullWidth
                                {...register('name', {
                                    required: 'Name is required',
                                    minLength: {
                                        value: 2, 
                                        message: 'Name must be at least 2 characters'
                                    }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                type='email'
                                label='Email' 
                                fullWidth
                                {...register('email', {
                                    required: 'Email is required',
                                    validate: validations.isEmail
                                })} 
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                type='password'
                                label='Password' 
                                fullWidth 
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },

                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                fullWidth 
                                className='circular-btn' 
                                color='secondary'
                            >
                                Register
                            </Button>
                            <Chip
                                label={errorMessage}
                                color='error'
                                variant='outlined'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{
                                    mt: 1, width: '100%',
                                    display: showError ? 'flex' : 'none'
                                }}
                            />
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
            </form>
        </AuthLayout>
    )
}
export default RegisterPage