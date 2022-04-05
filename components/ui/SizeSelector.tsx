import { FC } from 'react'
import { Box, Button } from '@mui/material'
import { iSize } from '../../interfaces'

interface Props{
    selectedSize?: iSize;
    sizes: iSize[];
}

export const SizeSelector: FC<Props> = ({selectedSize,sizes}) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button 
                    key={size}
                    color={selectedSize === size ? 'primary' : 'info'}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}