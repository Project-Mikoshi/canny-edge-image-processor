import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Grid } from '@mui/material'
import { ImageProcessScreen } from '@/components/ImageProcessScreen'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { ConnectionManager } from '@/connections/manager'
import { NotificationMessage } from '@/types/notification'
import { ImageData } from '@/types/image'
import { ImageProcessingStatus } from '@/types/event'


export default function Dashboard() {
    // == Props ================================

    // == States ===============================
    const [ready, setReady] = useState(false)
    const [selectedImageFile, setSelectedImageFile] = useState<ImageData>()
    const [previewImages, setPreviewImages] = useState<Array<string>>([])
    const [isProcessing, setProcessing] = useState(false)

    // == Hooks ================================
    const { enqueueSnackbar } = useSnackbar()

    // == Functions ============================
    function establishConnection() {
        const connectionManager = ConnectionManager.getInstance()

        connectionManager.connect()

        const socket = connectionManager.socket

        socket.on('connect', () => {

            notifyUser({
                type: 'success',
                message: `Successfully established connection with server - id: ${socket.id}`
            })
        })

        socket.on('connect_error', () => {
            notifyUser({
                type: 'error',
                message: 'Failed to establish connection with server'
            })
        })

        socket.on('updateStatus', (status: ImageProcessingStatus) => {
            if (status == ImageProcessingStatus.REQUEST_RECEIVED) {
                setProcessing(true)

                notifyUser({
                    type: 'info',
                    message: 'Photo is being processed by the server, please wait for status update'
                })
            }

            if (status == ImageProcessingStatus.IMAGE_READY_FOR_RETRIEVAL) {
                notifyUser({
                    type: 'success',
                    message: 'Photo successfully processed, ready for viewing'
                })

                retrieveResult().then(() => setProcessing(false))
            }
        })
    }

    // == Actions ==============================
    function onReadyToUpload() {
        setReady(true)
        establishConnection()
    }

    function notifyUser (notification: NotificationMessage) {
        enqueueSnackbar(notification.message, { variant: notification.type })
    }

    function handleSelection(event: React.ChangeEvent<HTMLInputElement>) {
        const photo = event.target.files![0]
        const reader = new FileReader()

        reader.readAsDataURL(photo)

        reader.onload = () => {
            const src = reader.result as string
            const img = new Image()

            img.src = src

            img.onload = function() {
                const width = img.naturalWidth
                const height = img.naturalHeight

                setSelectedImageFile({
                    raw: src,
                    meta: {
                        width,
                        height,
                        channel: 3
                    }
                })

                setPreviewImages([src])
            }
        }
    }

    async function upload () {
        const connectionManager = ConnectionManager.getInstance()

        await connectionManager.sendImage(selectedImageFile!)
    }

    async function retrieveResult () {
        const connectionManager = ConnectionManager.getInstance()
        const response = await connectionManager.receiveResult()
        const payload = await response.json()
        const processed_images = payload.images.map((imageEncoded: string) => `data:image/jpeg;base64,${imageEncoded}`)
        setPreviewImages(processed_images)
    }

    // == Template =============================
    return (
        <>
            <Grid
                container
                className='dashboard'
                padding={2}
                sx={{
                    direction: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {!ready && <WelcomeScreen action={onReadyToUpload} />}
                {ready && (
                    <ImageProcessScreen
                        selectedImage={selectedImageFile!}
                        previewImages={previewImages}
                        isProcessing={isProcessing}
                        onSelection={handleSelection}
                        onUpload={upload}
                    />
                )}
            </Grid>
        </>
    )
}
