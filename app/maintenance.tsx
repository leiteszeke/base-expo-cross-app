import C, { apply } from 'consistencss'

import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { useAppStore } from '#store'
import { logEvent } from '#helpers/analytics'
import { AppVersion } from '#types'
import { router, useFocusEffect } from 'expo-router'

const Maintenance = () => {
  const { user } = useAppStore()

  useFocusEffect(
    useCallback(() => {
      logEvent('maintenance', {
        currentVersion: AppVersion,
        user: {
          id: user?.id,
          email: user?.email,
          name: user?.name,
        },
      })

      setTimeout(() => {
        logEvent('maintenance.auto-redirect', {
          currentVersion: AppVersion,
          user: {
            id: user?.id,
            email: user?.email,
            name: user?.name,
          },
        })

        router.navigate('/')
      }, 5000)
    }, []),
  )

  return (
    <View style={apply(C.flex, C.px4, C.itemsCenter, C.justifyCenter)}>
      <Text style={apply(C.font6, C.mt3, C.px8, C.alignCenter, C.familyBold)}>
        La app se encuentra en mantenimiento
      </Text>
      <Text style={apply(C.font5, C.mt3, C.px8, C.alignCenter, C.familySemibold)}>
        Lamentamos las molestias pero si ves esta pantalla es porque estamos haciendo tareas de
        mantenimiento para mejorar tu experiencia con el sistema. Vuelve a intentar en unos minutos.
      </Text>
    </View>
  )
}

export default Maintenance
