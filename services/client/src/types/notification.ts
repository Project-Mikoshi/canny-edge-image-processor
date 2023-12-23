import { VariantType } from 'notistack'

export interface NotificationMessage {
    type: VariantType,
    message: string
}
