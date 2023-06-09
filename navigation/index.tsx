import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import React, { useEffect, useRef, useState } from 'react'

import { logScreenView } from '#helpers/analytics'
import { isWeb } from '#helpers/device'
import MyEvents from '#helpers/myEvents'
import { useDevice } from '#hooks/useDevice'
import { RootStackParamList } from '#types'

import LinkingConfiguration from './LinkingConfiguration'
import MobileNavigator from './Mobile'
import { navigationRef } from './Navigator'
import WebNavigator from './Web'

type Options = {
  title: string
}

type Route = {
  name: string
  params?: {
    id?: string
    name?: string
  }
}

const parseTitle = (title: string, params?: Route['params']) => {
  if (!title) {
    return ''
  }

  if (title.includes(':id') && params?.id) {
    return title.replace(':id', `#${params.id}`)
  }

  if (title.includes(':name') && params?.name) {
    return title.replace(':name', params.name)
  }

  return title
}

export default function Navigation() {
  const routeNameRef = useRef<string>()
  const [documentTitle, setDocumentTitle] = useState<string>('Daruma')
  const { isDesktop } = useDevice()

  useEffect(() => {
    const setTitle = (event: Event) => {
      const e = event as CustomEvent<{ name: string }>

      setDocumentTitle(parseTitle(documentTitle, e.detail))
    }

    if (isDesktop) {
      MyEvents.addEventListener('setTitle', setTitle)

      return () => {
        MyEvents.removeEventListener('setTitle', setTitle)
      }
    }
  }, [documentTitle])

  return (
    <NavigationContainer
      ref={navigationRef}
      documentTitle={{
        formatter: () => documentTitle,
      }}
      linking={LinkingConfiguration}
      onReady={() => {
        if (navigationRef.current) {
          const currentOptions = navigationRef.current?.getCurrentOptions() as Options
          const currentRoute = navigationRef.current?.getCurrentRoute() as Route

          routeNameRef.current = currentRoute.name

          setDocumentTitle(parseTitle(currentOptions.title, currentRoute.params))
        }
      }}
      onStateChange={async () => {
        if (navigationRef.current) {
          const currentOptions = navigationRef.current?.getCurrentOptions() as Options
          const currentRoute = navigationRef.current?.getCurrentRoute() as Route

          const previousRouteName = routeNameRef.current
          const currentRouteName = currentRoute.name

          if (currentRouteName && previousRouteName !== currentRouteName) {
            logScreenView(currentRouteName)
          }

          if (navigationRef.current) {
            navigationRef.current.screens = {
              previous: previousRouteName,
              current: currentRouteName,
            }
          }

          routeNameRef.current = currentRouteName

          setDocumentTitle(parseTitle(currentOptions.title, currentRoute.params))
        }
      }}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={isWeb ? WebNavigator : MobileNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
