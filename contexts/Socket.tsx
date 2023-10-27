import newSocketClient, { ClientToServerEvents, ServerToClientEvents } from 'services/socket'
import { Socket } from 'socket.io-client'

import { createContext, PropsWithChildren, useEffect, useState } from 'react'

import { UserWithToken } from '#types'

type SocketContextProps = {
  client: Socket<ServerToClientEvents, ClientToServerEvents>
}

export const SocketContext = createContext<Partial<SocketContextProps>>({})

export const SocketProvider = ({ children, user }: PropsWithChildren<{ user: UserWithToken }>) => {
  const [client] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>(
    newSocketClient(user),
  )

  useEffect(() => {
    return () => {
      client.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <SocketContext.Provider value={{ client }}>{children}</SocketContext.Provider>
}

export default SocketProvider
