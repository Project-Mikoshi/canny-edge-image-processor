import React, { FC }  from 'react'
import { Grid } from '@mui/material'
import { Button, Paper, Container, Loading, Scroll } from '@mikoshi/components/core'
import UploadIcon from '@mui/icons-material/Upload'
import { SelectImageButton } from '@/components/SelectImageButton'


interface ImageProcessScreenProps {
    selectedImage: any,
    previewImages: Array<string>,
    isProcessing: boolean,
    onSelection: (event: React.ChangeEvent<HTMLInputElement>) => void
    onUpload: () => void
}

export const ImageProcessScreen: FC<ImageProcessScreenProps>  = (props) => {
    // == Props ================================
    const { selectedImage, previewImages, isProcessing, onSelection, onUpload } = props

    // == States ===============================

    // == Hooks ================================

    // == Functions ============================

    // == Actions ==============================

    // == Template =============================
    return (
        <>
            <Grid item md={8}>
                <Paper className='m-flex m-flex-column m-padding-5 m-flex-algin-center'>
                    {!selectedImage && (
                        <SelectImageButton
                            title='Please Choose a Photo to Upload'
                            multiple={false}
                            onSelection={onSelection}
                        />
                    )}

                    {selectedImage && (
                        <>
                            <Container flex className='m-flex m-flex-justify-around'>
                                <SelectImageButton
                                    title='Choose a Different Photo'
                                    multiple={false}
                                    onSelection={onSelection}
                                />
                                <br />
                                <Button variant='contained' onClick={onUpload}>
                                    <UploadIcon className='m-margin-r-1' />
                                    <span>Upload</span>
                                </Button>
                            </Container>

                            <Scroll className='m-flex m-flex-column m-flex-align-center m-flex-justify-center'>
                                {previewImages && previewImages.map((src: string) => (
                                    <img className='photo-preview m-margin-1' src={src} alt='selected image' loading="lazy" />
                                ))}

                                {isProcessing && (
                                    <Loading type='line' />
                                )}
                            </Scroll>
                        </>
                    )}
                </Paper>
            </Grid>
        </>
    )
}
