import { ApolloProvider } from '@apollo/client'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import React, { useCallback, useMemo } from 'react'

import Login from '#screens/Login'
import Home from '#screens/Home'
import { newGraphQLClient } from '#services/graphql'
import { useAppStore } from '#store'
import { MyEvent, RootNativeStackParamList } from '#types'
import { useFocusEffect } from '@react-navigation/native'
import MyEvents from '#helpers/myEvents'

const Stack = createNativeStackNavigator<RootNativeStackParamList>()

function MobileNavigator() {
  const { user, setUser } = useAppStore()

  const GraphQLClient = useMemo(() => newGraphQLClient(user), [user])

  const refreshUserToken = useCallback(
    (event: MyEvent) => {
      if (user) {
        setUser({
          ...user,
          accessToken: event.detail,
        })
      }
    },
    [user],
  )

  useFocusEffect(
    useCallback(() => {
      MyEvents.addEventListener('refreshToken', refreshUserToken)

      return () => {
        MyEvents.removeEventListener('refreshToken', refreshUserToken)
      }
    }, []),
  )

  if (!user) {
    return (
      <ApolloProvider client={GraphQLClient}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" options={{ title: 'Ingresar' }} component={Login} />
        </Stack.Navigator>
      </ApolloProvider>
    )
  }

  return (
    <ApolloProvider client={GraphQLClient}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false, animation: 'none' }}>
        <Stack.Screen name="Home" options={{ title: 'Home' }} component={Home} />
      </Stack.Navigator>
    </ApolloProvider>
  )
}

export default MobileNavigator
