import React, { useState } from 'react'
import { SnackbarProvider } from 'notistack'
import { Scroll } from '@mikoshi/components/core'
import { NavBar } from '@/components/NavBar'
import { ParticleEffectBackground } from '@/components/ParticleEffectBackground'
import { Theme } from '@/types/theme'
import Dashboard from '@/pages/Dashboard/Dashboard'
import './styles.scss'

export default function App () {
    // == Props ================================

    // == States ===============================
    const [theme, setTheme] = useState('light' as Theme)

    // == Lifecycle ============================

    // == Functions ============================
    function updateBodyTheme (newTheme: Theme) {
        const bodyClassList = document.body.classList
        const theme = ['dark', 'light']

        theme.forEach(theme => {
            bodyClassList.remove(theme)
        })

        bodyClassList.add(newTheme)
        setTheme(newTheme)
    }

    // == Actions ==============================
    const onThemeChange = (newTheme: Theme) => updateBodyTheme(newTheme)

    // == Template =============================
    return (
        <SnackbarProvider maxSnack={3} >
            <div className='app' data-theme={theme}>
                <NavBar
                    onThemeChange={onThemeChange}
                    title='Image Processor'
                    theme={theme}
                />
                <ParticleEffectBackground theme={theme} />
                <Scroll className='outlet'>
                    <Dashboard />
                </Scroll>
            </div>
        </SnackbarProvider>
    )
}
