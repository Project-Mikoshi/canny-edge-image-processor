import React, { FC } from 'react'
import {
    Toolbar,
    SxProps
} from '@mui/material'
import { AppBar, DarkModeSwitch } from '@mikoshi/components/specialized'
import { Container, Typography } from '@mikoshi/components/core'
import { Theme } from '@/types/theme'

interface NavBarProps {
    title: string,
    sx?: SxProps,
    theme?: Theme,
    onThemeChange: (theme: Theme) => void
}

export const NavBar: FC<NavBarProps> = (props) => {
    // == Props ================================
    const { title, onThemeChange, theme, sx } = props

    // == Hooks ================================

    // == Functions ============================

    // == Actions ==============================
    const handleDarkModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        onThemeChange(checked ? 'dark' : 'light')
    }

    // == Template =============================
    return (
        <AppBar
            color='primary'
            position='sticky'
            sx={sx}
        >
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography variant='h6' sx={{ mr: 2, display: { xs: 'none', sm: 'block', md: 'block' } }}>
                        {title}
                    </Typography>
                    <DarkModeSwitch className='m-margin-l-auto' checked={theme === 'dark'} onChange={handleDarkModeToggle} />
                </Toolbar>
            </Container>
        </AppBar>
    )
}
