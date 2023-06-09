import { ApolloProvider } from '@apollo/client'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import React, { useMemo } from 'react'

import Login from '#screens/Login'
import Home from '#screens/Home'
import { newGraphQLClient } from '#services/graphql'
import { useAppStore } from '#store'
import { RootNativeStackParamList } from '#types'

const Stack = createNativeStackNavigator<RootNativeStackParamList>()

function MobileNavigator() {
  const { user } = useAppStore()

  const GraphQLClient = useMemo(() => newGraphQLClient(user), [user])

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
