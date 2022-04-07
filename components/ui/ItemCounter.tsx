import { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'

interface Props {
  count: number;
  maxValue: number;
  onChange: (value: number) => void;
}

export const ItemCounter: FC<Props> = ({count,maxValue,onChange}) => {
  return (
    <Box display='flex' alignItems='center'>
        <IconButton
          onClick={() => onChange(Math.max(count - 1, 1))}
        >
            <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{width: 40, textAlign: 'center'}}>{count}</Typography>
        <IconButton
          onClick={() => onChange(Math.min(count + 1, maxValue))}
        >
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}