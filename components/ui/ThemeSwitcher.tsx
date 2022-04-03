import { Button, ButtonGroup, useTheme } from '@mui/material'
import { FC, useContext } from 'react'
import { ThemeContext } from '../../context/theme'

interface Props {
    showSmall?: boolean
}

export const ThemeSwitcher: FC<Props> = ({showSmall = true}) => {
    const {currentTheme,changeTheme} = useContext(ThemeContext);
    const {palette} = useTheme();
    return (
        <ButtonGroup 
            sx={{
                mr: 2,
                display: {
                    xs: showSmall ? 'flex' : 'none',
                    sm: showSmall ? 'flex' : 'none',
                    md: 'flex'
                }
            }} 
            size='small' 
            variant='outlined' 
            disableElevation
            aria-label="outlined primary button group"
        >
            <Button
                color={currentTheme === 'light' ?  'secondary' : 'primary'}
                onClick={() => changeTheme('light')}
                variant={currentTheme === 'light' ? 'contained' : 'outlined'}
                sx={currentTheme === 'light' ? {":hover": {backgroundColor: 'secondary.main'}} : {}}
            >
                Light
            </Button>
            <Button
                color={currentTheme === 'dark' ?  'secondary' : 'primary'}
                onClick={() => changeTheme('dark')}
                variant={currentTheme === 'dark' ? 'contained' : 'outlined'}
            >
                Dark
            </Button>
            <Button
                color={currentTheme === 'system' ?  'secondary' : 'primary'}
                onClick={() => changeTheme('system')}
                variant={currentTheme === 'system' ? 'contained' : 'outlined'}
                sx={{
                    ":hover": {
                        color: palette.mode === 'dark' ? 'primary.main' : '#000'
                    }
                }}
            >
                System
            </Button>
        </ButtonGroup>
    )
}