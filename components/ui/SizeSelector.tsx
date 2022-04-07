import { FC } from 'react'
import { Box, Button } from '@mui/material'
import { iSize } from '../../interfaces'

interface Props{
    selectedSize?: iSize;
    sizes: iSize[];
    onSelectSize: (size: iSize) => void;
}

export const SizeSelector: FC<Props> = ({selectedSize,sizes,onSelectSize}) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button 
                    key={size}
                    color={selectedSize === size ? 'primary' : 'info'}
                    onClick={() => onSelectSize(size)}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}