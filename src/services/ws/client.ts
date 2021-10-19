import socketio from 'socket.io-client'

import { gatewayUrl } from 'config/ws'

export const WSclient = socketio({ host: gatewayUrl })
