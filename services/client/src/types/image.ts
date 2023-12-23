export interface ImageData {
    raw: string,
    meta: ImageMetaData
}

interface ImageMetaData {
    height: number,
    width: number,
    channel: number
}
