import { useRouter } from 'next/router';
import { getProviders, signIn } from 'next-auth/react';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import NextLink from 'next/link';
import { validations } from '../../utils';
import { ErrorOutline, GitHub } from '@mui/icons-material';
import { useContext, useState, useEffect } from 'react';
//import { AuthContext } from '../../context/auth/AuthContext';

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {
    //const {login} = useContext(AuthContext);
    const {replace,query} = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({})
    useEffect(() => {
      getProviders().then(providers => {
        setProviders(providers)
      })
    }, []) 
    
    const onLogin = (formValues: FormData) => {
        setShowError(false);
        signIn('credentials', {...formValues, redirect: false})
        .then(({ok,error}: any) => {
            if(ok){
                const path = query.page?.toString() || '/';
                replace(path);
            }else{
                setValue('password', '');
                console.log(error);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }
        })
        /* const isValidLogin = await login(formValues.email, formValues.password);
        if(!isValidLogin) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        const path = query.page?.toString() || '/';
        replace(path); */
    };

    return (
        <AuthLayout title='Login'>
            <form onSubmit={handleSubmit(onLogin)} noValidate>  
                <Box sx={{width: 350, padding: '10px 20px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{mb: 0.5}}>
                            <Typography variant='h1' component='h1'>Login</Typography>
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
                                Enter
                            </Button>
                            <Chip 
                                label='Email and password do not match'
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
                            <NextLink href={`/auth/register?page=${query.page?.toString() || '/'}`} passHref>
                                <Link underline='always'>
                                    Don&lsquo;t have an account?
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end' flexDirection='column'>
                            <Divider sx={{width: '100%',mb: 2}}/>
                            {
                                Object.values(providers || {}).map((provider: any) => (
                                    (provider.id !== 'credentials') && 
                                    <Button
                                        key={provider.id}
                                        className='fadeIn'
                                        variant='outlined'
                                        fullWidth
                                        color='primary'
                                        sx={{mb: 1}}
                                        onClick={() => signIn(provider.id)}
                                    >
                                        <GitHub sx={{mr: 1}}/>
                                        {provider.name}
                                    </Button>  
                                )) 
                            }
                        </Grid> 
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}
export default LoginPage