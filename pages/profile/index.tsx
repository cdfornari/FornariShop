import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';

const ProfilePage = () => {
  return (
    <ShopLayout title={'Profile'} pageDescription={'user profile'}>
      <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            sx={{
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                }
            }}
        >
            <Typography 
                variant='h1' 
                component='h1' 
                fontSize={80}
                fontWeight={200}
            >
                Coming soon
            </Typography>
            <Typography 
                variant='h2'
                sx={{ml: 2}}
            >
                This page is not ready yet
            </Typography>
        </Box>
    </ShopLayout>
  )
}
export default ProfilePage