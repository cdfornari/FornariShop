import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { DashboardLayout } from '../../../components/layouts'
import { iProduct, iSize } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { iType } from '../../../interfaces';
import { api } from '../../../api';


const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']

interface Props {
    product: iProduct;
}

type FormData = {
    title: string,
    description: string,
    inStock: number,
    price: number,
    slug: string,
    tags: string[],
    images: string[],
    type: iType,
    sizes: iSize[],
    gender: 'men'|'women'|'kid'|'unisex',
};

const ProductAdminPage:FC<Props> = ({ product }) => {
    const {replace} = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    });

    const [isSaving, setIsSaving] = useState(false)
    useEffect(() => {
        const observable = 
        watch((value, {name}) => name === 'title' && (
            setValue('slug', 
                value.title?.trim()
                    .replaceAll(' ','_')
                    .replaceAll("'",'')
                    .toLocaleLowerCase()
                || ''
            )
        ) )
        return () => observable.unsubscribe();
    }, []);

    const [tagValue, setTagValue] = useState('');
    const onNewTag = () => {
        if(tagValue.trim() === '') return;
        const newTag = tagValue.trim().toLocaleLowerCase();
        const tags = getValues('tags') || [];
        if(tags.includes(newTag)) return;
        tags.push(newTag);
        setTagValue('');
    }
    const onDeleteTag = ( tagToDelete: string ) => {
        const tags = getValues('tags') || [];
        const newTags = tags.filter(tag => tag !== tagToDelete);
        setValue('tags', newTags, { shouldValidate: true });
    }

    const onFilesSelected = async({target}: ChangeEvent<HTMLInputElement>) => {
        if(!target.files || target.files.length === 0) return;
        try {
            for(const file of target.files){
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await api.post<{message: string}>('/admin/upload', formData);
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async( formValues: FormData ) => {
        if(formValues.images.length < 2) return alert('Please upload at least 2 images');
        setIsSaving(true);
        try {
            if(product._id === 'new'){
                const {data} = await api({
                    url: '/admin/products',
                    method: 'POST',
                    data: formValues
                })
                replace(`/admin/products/${data.slug}`);
                alert('Product created successfully');
            }else{
                await api({
                    url: '/admin/products',
                    method: 'PUT',
                    data: formValues
                })
                setIsSaving(false);
                alert('Product updated successfully');
            }
        } catch (error) {
            console.log(error);
            setIsSaving(false)
        }
    }

    return (
        <DashboardLayout 
            title={'Products'} 
            subtitle={`Editing: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        variant='contained'
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={isSaving}
                    >
                        Save
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Title"
                            variant="filled"
                            fullWidth 
                            defaultValue={product.title}
                            sx={{ mb: 1 }}
                            { ...register('title', { 
                                required: 'Title is required',
                                minLength: {
                                    value: 3,
                                    message: 'Title must be at least 3 characters'
                                }
                            }) }
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Description"
                            variant="filled"
                            fullWidth 
                            multiline
                            defaultValue={ product.description }
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 3,
                                    message: 'Description must be at least 3 characters'
                                }
                            }) }
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventory"
                            type='number'
                            variant="filled"
                            fullWidth 
                            defaultValue={ product.inStock }
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Inventory is required',
                                min: {
                                    value: 0,
                                    message: 'Inventory must be equal or greater than 0'
                                }
                            }) }
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Price"
                            type='number'
                            variant="filled"
                            fullWidth 
                            defaultValue={ product.price }
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Price is required',
                                min: {
                                    value: 1,
                                    message: 'Price must be greater than 0'
                                }
                            }) }
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                onChange={ ({target}) => setValue('type', target.value as iType, {shouldValidate: true}) }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ ({target}) => setValue('gender', target.value as any, {shouldValidate: true}) }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Sizes</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel 
                                        key={size} 
                                        control={<Checkbox checked={getValues('sizes').includes(size as iSize)}/>}
                                        label={ size } 
                                        onChange={() => (
                                            getValues('sizes').includes(size as iSize) ?
                                                setValue('sizes', getValues('sizes').filter(s => s !== size), {shouldValidate: true})
                                            :
                                                setValue('sizes', [...getValues('sizes'), size] as iSize[], {shouldValidate: true})
                                        )}
                                    />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            defaultValue={ product.slug }
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Slug is required',
                                minLength: {
                                    value: 3,
                                    message: 'Slug must be at least 3 characters'
                                },
                                validate: (value: string) => value.trim().includes(' ') ? 'Slug must not contain spaces' : undefined,
                            }) }
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Tags"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Press [spacebar] to add"
                            value={tagValue}
                            onChange={({target}) => !target.value.includes(' ') && setTagValue(target.value)}
                            onKeyUp={({key}) => key === ' ' && onNewTag()}
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => { 
                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={() => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Images</FormLabel>
                            <Button
                                variant='contained'
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Upload image
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept='image/png, image/gif, image/jpeg, image/jpg'
                                style={{ display: 'none' }}
                                onChange={onFilesSelected}
                            />

                            {
                                getValues('images').length < 2 &&
                                    <Chip 
                                        label="You have to upload a minimum of 2 images"
                                        color='error'
                                        variant='outlined'
                                    />
                            }

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        variant='text'
                                                        fullWidth
                                                        color="error"
                                                        onClick={() => setValue('images', getValues('images').filter(image => image !== img), { shouldValidate: true })}
                                                    >
                                                        Delete
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </DashboardLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { slug = ''} = query;
    let product: iProduct | null;
    if(slug === 'new'){
        product = {
            _id: 'new',
            title: '',
            description: '',
            price: 0,
            type: '' as iType,
            gender: '' as "men" | "women" | "kid" | "unisex",
            images: ['1','2'],
            sizes: [],
            inStock: 0,
            slug: '',
            tags: []
        }
    }else{
        product = await dbProducts.getProductBySlug(slug.toString());
    }
    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    return {
        props: {
            product
        }
    }
}

export default ProductAdminPage