import React, { FC } from 'react'
import { Button } from '@mikoshi/components/core'
import PhotoCamera from '@mui/icons-material/PhotoCamera'


interface SelectImageButtonProps {
    title: string,
    multiple: boolean,
    onSelection: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SelectImageButton: FC<SelectImageButtonProps> = (props) => {
    // == Props ================================
    const { title, multiple = false, onSelection } = props

    // == Hooks ================================

    // == Functions ============================

    // == Actions ==============================

    // == Template =============================
    return (
        <Button variant='contained' color='secondary' component={'label' as any}>
            <PhotoCamera className='m-margin-r-1' />
            <span>{title}</span>
            <input hidden accept='image/*' multiple={multiple} type='file' onChange={onSelection} />
        </Button>
    )
}
