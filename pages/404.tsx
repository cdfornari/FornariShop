import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ShopLayout } from '../components/layouts'

const Custom404 = () => {
  return (
    <ShopLayout 
        title="Page not found"
        pageDescription='nothing to see here'
    >
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
                404 |
            </Typography>
            <Typography 
                variant='h2'
                sx={{ml: 2}}
            >
                We did not found anything here
            </Typography>
        </Box>
    </ShopLayout>
  )
}
export default Custom404