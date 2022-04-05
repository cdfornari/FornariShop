import { Button, ButtonGroup, useTheme } from '@mui/material'
import { FC, useContext } from 'react'
import { ThemeContext } from '../../context/theme'

interface Props {
    showSmall?: boolean;
    showMedium?: boolean;
}

export const ThemeSwitcher: FC<Props> = ({showSmall = false, showMedium = false}) => {
    const {currentTheme,changeTheme} = useContext(ThemeContext);
    const {palette} = useTheme();
    return (
        <ButtonGroup 
            className='fadeIn'
            sx={{
                mr: 2,
                backgroundColor: palette.info.main,
                borderRadius: 3,
                display: {
                    xs: showSmall ? 'flex' : 'none',
                    md: showMedium ? 'flex' : 'none',
                }
            }} 
            variant='outlined'
            size='small' 
            disableElevation
            aria-label="outlined primary button group"
        >
            <Button
                color={currentTheme === 'light' ?  'secondary' : 'primary'}
                onClick={() => changeTheme('light')}
            >
                Light
            </Button>
            <Button
                color={currentTheme === 'dark' ?  'secondary' : 'primary'}
                onClick={() => changeTheme('dark')}
            >
                Dark
            </Button>
            <Button
                color={currentTheme === 'system' ?  'secondary' : 'primary'}
                onClick={() => changeTheme('system')}
            >
                System
            </Button>
        </ButtonGroup>
    )
}