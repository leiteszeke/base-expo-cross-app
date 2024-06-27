import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import Config from '#helpers/config'
import { AppStore, resetStore } from '#store'
import { AppVersion, UserWithToken } from '#types'
import { Platform } from 'react-native'
import { onError } from '@apollo/client/link/error'
import MyEvents from '#helpers/myEvents'

const link = new HttpLink({
  uri: `${Config.apiUrl}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const { user } = AppStore.getState()

  return {
    headers: {
      ...headers,
      authorization: user ? `Bearer ${user.accessToken}` : '',
      'x-example-app-version': AppVersion,
      'x-example-service': ['ios', 'android'].includes(Platform.OS) ? 'MOBILE_FRONT' : 'FRONT',
    },
  }
})

// Initialize Apollo Client
export const GraphQLClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

type NetworkError = Error & {
  statusCode: number
  result: { message: string }
}

const errorLink = onError((error) => {
  if (error.networkError) {
    const currentError = error.networkError as NetworkError

    if (currentError.statusCode === 401 && currentError.result.message === 'not_authorized') {
      resetStore()

      window.location.href = window.location.origin + '/login'
    }
  }
})

const authLinkWithUser = (user: Omit<UserWithToken, 'storeUsers'> | null) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: user ? `Bearer ${user.accessToken}` : '',
        'x-example-app-version': AppVersion,
        'x-example-service': ['ios', 'android'].includes(Platform.OS) ? 'MOBILE_FRONT' : 'FRONT',
      },
    }
  })

const refreshTokenLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const {
      response: { headers },
    } = context

    if (headers) {
      const refreshedToken = headers.get('X-Example-New-Token')

      if (refreshedToken) {
        MyEvents.emit('refreshToken', refreshedToken)
      }
    }

    return response
  })
})

export const newGraphQLClient = (user: Omit<UserWithToken, 'storeUsers'> | null) =>
  new ApolloClient({
    link: authLinkWithUser(user).concat(refreshTokenLink).concat(errorLink).concat(link),
    cache: new InMemoryCache(),
  })

export default GraphQLClient
