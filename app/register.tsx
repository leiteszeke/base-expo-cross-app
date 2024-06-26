import C, { apply } from 'consistencss'

import React, { useCallback } from 'react'
import { ViewStyle, Text } from 'react-native'

import Layout from '#components/Layout'
import { logEvent } from '#helpers/analytics'
import { Redirect, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useAppStore } from '#store'

const Register = () => {
  const { user } = useAppStore()
  const params = useLocalSearchParams()

  useFocusEffect(
    useCallback(() => {
      if (params?.referral) {
        logEvent('Navigate from Referral', { referral: params.referral })
      }
    }, []),
  )

  if (user) {
    return <Redirect href="/" />
  }

  return (
    <Layout style={apply(C.bgPurple, C.justifyCenter) as ViewStyle}>
      <Text>Register</Text>
    </Layout>
  )
}

export default Register
