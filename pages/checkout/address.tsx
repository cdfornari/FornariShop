import { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { useRouter } from 'next/router';
import { Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { countries } from '../../utils';
import { CartContext } from '../../context';
//import { GetServerSideProps } from 'next'
//import { jwt } from '../../utils';

type FormData = {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    address2?: string;
    city: string;
    zip: string;
};

const getAddressFromCookies = (): FormData => {
    const address = Cookies.get('address')  || '{}';
    return JSON.parse(address);
}

const AddressPage = () => {
    const {updateAddress} = useContext(CartContext);
    const {push} = useRouter();
    const { register, handleSubmit, formState: { errors },control} = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const firstSelect = useRef(true)
    const [touched, setTouched] = useState(false);
    const [country, setCountry] = useState('');
    useEffect(() => {
        if (firstSelect.current) {
            setCountry(Cookies.get('country') || '');
            firstSelect.current = false;
        }else{
            Cookies.set('country', country);
        }
    }, [country]);
    const isError = useMemo(() => touched && country === '' ? true : false, [touched, country]);

    const onSubmit = (formValues: FormData) => {
        if(country === '') return setTouched(true);
        Cookies.set('address', JSON.stringify(formValues));
        Cookies.set('country', country);
        updateAddress({...formValues, country});
        push('/checkout/summary');
    }

    return (
        <ShopLayout title='Address' pageDescription='Confirm shipping address'>
            <Typography variant='h1' component='h1' sx={{mb: 3}}>Address</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label='First name' 
                            fullWidth
                            {...register('firstName', {
                                required: 'First name is required'
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />  
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label='Last name' 
                            fullWidth
                            {...register('lastName', {
                                required: 'Last name is required'
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label='Street 1' 
                            fullWidth
                            {...register('address', {
                                required: 'Address is required'
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label='Street 2' 
                            fullWidth
                            {...register('address2')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label='ZIP Code' 
                            fullWidth
                            {...register('zip', {
                                required: 'ZIP Code is required',
                                minLength: {
                                    value: 4,
                                    message: 'ZIP Code must be at least 4 characters',
                                },
                            })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label='City' 
                            fullWidth
                            {...register('city', {
                                required: 'City is required'
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                label='Country'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                error={isError}
                                helperText={isError ? 'Country is required' : ''}
                            >
                                {
                                    countries.map((country) => (
                                        <MenuItem 
                                            key={country.code} 
                                            value={country.name}
                                        >
                                            {country.name}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label='Phone Number' 
                            fullWidth
                            {...register('phone', {
                                required: 'Phone number is required'
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>

                <Box sx={{mt: 5}} display='flex' justifyContent='center'>
                    <Button 
                        type='submit'
                        color='secondary' 
                        className='circular-btn' 
                        size='large'
                        variant='contained'
                        onClick={() => setTouched(true)}
                    >
                        Review purchase
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}

/* export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token = '' } = ctx.req.cookies;
    let isValidToken = false;
    try {
        await jwt.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        console.log(error);
    }

    if(!isValidToken) {
        return {
            redirect: {
                destination: '/auth/login?page=/checkout/address',
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
} */

export default AddressPage