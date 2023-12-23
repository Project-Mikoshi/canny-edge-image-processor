import React, { FC }  from 'react'
import { Grid } from '@mui/material'
import { Typography, Button } from '@mikoshi/components/core'

interface WelcomeScreenProps {
    action: () => void
}

export const WelcomeScreen: FC<WelcomeScreenProps> = (props: WelcomeScreenProps) => {
    // == Props ================================
    const { action } = props

    // == States ===============================

    // == Hooks ================================

    // == Functions ============================

    // == Actions ==============================

    // == Template =============================
    return (
        <>
            <Grid item xs={8} md={8}>
                <Typography className='typewriter' variant='h4'>Welcome to Image Processor</Typography>
                <Typography>
                    an image classification application for detecting holds on indoor rock climbing walls
                </Typography>
            </Grid>

            <Grid item xs={6} md={8}>
                <Button variant='contained' onClick={action}>Get Started</Button>
            </Grid>
        </>
    )
}
