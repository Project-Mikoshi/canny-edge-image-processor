/* eslint-disable no-unused-vars */

export interface ServerToClientEvents {
    ping: (message: string) => void,
    updateStatus: (status: ImageProcessingStatus) => void
}

export interface ClientToServerEvents {
    handshake: () => void
}

export enum ImageProcessingStatus {
    REQUEST_RECEIVED = 'REQUEST_RECEIVED',
    IMAGE_READY_FOR_RETRIEVAL = 'IMAGE_READY_FOR_RETRIEVAL'
}
