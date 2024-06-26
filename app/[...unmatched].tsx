import C, { apply } from 'consistencss'

import React, { useCallback } from 'react'
import { View } from 'react-native'

import { useFocusEffect } from 'expo-router'
import { router } from 'expo-router'

const Error404 = () => {
  useFocusEffect(
    useCallback(() => {
      router.navigate('/')
    }, []),
  )

  return <View style={apply(C.p9, C.flex, C.justifyCenter, C.itemsCenter)}></View>
}

export default Error404
