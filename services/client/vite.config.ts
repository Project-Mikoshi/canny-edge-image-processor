import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

const SERVER_PORT = 8080
const SERVER_HOST = '127.0.0.1'

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        svgr(),
        splitVendorChunkPlugin()
    ],
    server: {
        port: 3000,
        open: true,
        host: true,
        proxy: {
            '/api': {
                target: `http://${SERVER_HOST}:${SERVER_PORT}`,
                changeOrigin: true,
                ws: true,
                secure: false
            },
            '/socket.io': {
                target: 'ws://127.0.0.1:8080',
                ws: true
            }
        }
    }
})
