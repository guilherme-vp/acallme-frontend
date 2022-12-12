import io from 'socket.io-client'

import { wsUrl } from 'config/ws'

export const mainSocket = io(wsUrl)

export const callSocket = io(`${wsUrl}/videocall`)

export const notificationSocket = io(`${wsUrl}/notification`)
