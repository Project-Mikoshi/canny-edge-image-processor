import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '@/types/event'
import { ImageData } from '@/types/image'

// A singleton class that act as a manager for all websocket related event
export class ConnectionManager {
    // == Props ================================
    static instance: ConnectionManager
    socket!: Socket<ServerToClientEvents, ClientToServerEvents>

    // == Constructor ==========================
    private constructor () {
        this.socket = io({
            transports: ['websocket']
        })

        Object.freeze(this)
    }

    // == Methods ==============================
    static getInstance () {
        if (!ConnectionManager.instance) {
            ConnectionManager.instance = new ConnectionManager()
        }

        return ConnectionManager.instance
    }

    connect () {
        this.socket.connect()
    }

    sendImage (image: ImageData) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.socket.id,
                data: image.raw,
                height: image.meta.height,
                width: image.meta.width,
                channel: image.meta.channel
            })
        }

        return fetch('/api/images/', options)
    }

    receiveResult () {
        return fetch(`/api/images/${this.socket.id}`)
    }

    disconnect () {
        this.socket.disconnect()
    }
}
