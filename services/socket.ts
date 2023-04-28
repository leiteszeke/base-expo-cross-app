import { Manager, Socket } from 'socket.io-client'

import { Platform } from 'react-native'

import { logEvent } from '#helpers/analytics'
import Config from '#helpers/config'
import { AppVersion, UserWithToken } from '#types'

export type ServerToClientEvents = {
  PRODUCT_UPDATED: (data: { updatedAt: Date }) => void
}

export type ClientToServerEvents = {}

const newSocketClient = (user: UserWithToken | null) => {
  const manager = new Manager<ServerToClientEvents, ClientToServerEvents>(Config.wsUrl)
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = manager.socket('/', {
    auth: {
      Authorization: `Bearer ${user?.accessToken}`,
      userId: user?.id,
      appVersion: AppVersion,
      referrer: Platform.OS,
    },
  })

  socket.on('connect', () => {
    logEvent('socket.connection', {
      socketId: socket.id,
      userId: user?.id,
      AppVersion: AppVersion,
      referrer: Platform.OS,
    })
  })

  socket.on('disconnect', () => {
    logEvent('socket.disconnection', {
      socketId: socket.id,
      userId: user?.id,
      AppVersion: AppVersion,
      referrer: Platform.OS,
    })
  })

  return socket
}

export default newSocketClient
