import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'
import C, { apply } from 'consistencss'

import React, { useCallback } from 'react'
import { ViewStyle, Text } from 'react-native'

import Layout from '#components/Layout'
import { logEvent } from '#helpers/analytics'
import { ScreensParamList } from '#types'

const Register = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, 'Register'>>()

  useFocusEffect(
    useCallback(() => {
      if (params?.referral) {
        logEvent('Navigate from Referral', { referral: params.referral })
      }
    }, []),
  )

  return (
    <Layout style={apply(C.bgPurple, C.justifyCenter) as ViewStyle}>
      <Text>Register</Text>
    </Layout>
  )
}

export default Register
