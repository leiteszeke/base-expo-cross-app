import { ClientToServerEvents, ServerToClientEvents } from '#services/socket'
import { Socket } from 'socket.io-client'

import { useContext } from 'react'

import { SocketContext } from '#contexts/Socket'

export const useSocket = () => {
  return useContext(SocketContext).client as Socket<ServerToClientEvents, ClientToServerEvents>
}
