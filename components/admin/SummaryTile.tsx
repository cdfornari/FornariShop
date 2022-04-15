import { FC } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { CreditCardOffOutlined } from '@mui/icons-material'

interface Props {
    title: string | number;
    subtitle: string;
    icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({title,subtitle,icon}) => {
  return (
    <Card sx={{display: 'flex'}}>
        <CardContent sx={{width: 50, dispaly: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {icon}
        </CardContent>
        <CardContent sx={{flex: '1 0 auto', display: 'flex', flexDirection: 'column'}}>
            <Typography variant='h3'>
                {title}
            </Typography>
            <Typography variant='caption'>
                {subtitle}
            </Typography>
        </CardContent>
    </Card>
  )
}