import { StatusBar } from 'expo-status-bar'

import { useCallback, useEffect, useMemo } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'

import AnalyticsProvider from '#contexts/Analytics'
import { getDeviceData } from '#helpers/device'
import { useAppStore } from '#store'
import extendStyles from '#helpers/styles'
import useCachedResources from '#hooks/useCachedResources'
import { Stack, router, useFocusEffect } from 'expo-router'
import { ApolloProvider } from '@apollo/client'
import MyEvents from '#helpers/myEvents'
import { MyEvent } from '#types'
import { newGraphQLClient } from '#services/graphql'

export const unstable_settings = {
  initialRouteName: 'login',
}

export default function App() {
  const isLoadingComplete = useCachedResources()
  const { setDeviceType, user, setUser } = useAppStore()

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

  const fetchDeviceType = async () => {
    const deviceData = await getDeviceData()

    setDeviceType(deviceData.deviceType)
  }

  useEffect(() => {
    fetchDeviceType()
  }, [])

  if (!isLoadingComplete) {
    return null
  }

  extendStyles()

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <ApolloProvider client={GraphQLClient}>
          <AnalyticsProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
            <StatusBar />
          </AnalyticsProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    </GluestackUIProvider>
  )
}
