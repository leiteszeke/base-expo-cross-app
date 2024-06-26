import C, { apply } from 'consistencss'

import React, { useCallback, useState } from 'react'
import { ViewStyle, Text, View, TextInput, TouchableOpacity } from 'react-native'

import Layout from '#components/Layout'
import { logEvent } from '#helpers/analytics'
import { Redirect, router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useAppStore } from '#store'

const Login = () => {
  const params = useLocalSearchParams()
  const { user, setUser } = useAppStore()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [valid, setValid] = useState(false)

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
    <Layout
      style={apply(C.bgPurple, C.justifyCenter) as ViewStyle}
      contentStyle={apply(C.p4, C.justifyCenter) as ViewStyle}>
      <Text testID="login-text" style={apply(C.font6, C.textWhite, C.alignCenter)}>
        Login
      </Text>
      <View style={apply(C.my4)}>
        <Text style={apply(C.font3, C.textWhite, C.weightBold, C.mb2)}>Username</Text>
        <TextInput
          style={apply(
            C.radius2,
            C.borderMinimum,
            C.borderGray,
            C.p3,
            C.wFull,
            C.textWhite,
            C.font4,
          )}
          placeholder="Username"
          placeholderTextColor="gray"
          onChange={(e) => setUsername(e.nativeEvent.text)}
          testID="usernameInput"
        />
      </View>
      <View style={apply(C.mb4)}>
        <Text style={apply(C.font3, C.textWhite, C.weightBold, C.mb2)}>Password</Text>
        <TextInput
          style={apply(
            C.radius2,
            C.borderMinimum,
            C.borderGray,
            C.p3,
            C.wFull,
            C.textWhite,
            C.font4,
          )}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          onChange={(e) => setPassword(e.nativeEvent.text)}
          testID="passwordInput"
        />
      </View>
      <TouchableOpacity
        style={apply(C.radius2, C.p3, C.bgBlack, C.itemsCenter, C.mb2)}
        onPress={() => {
          if (username.length > 0 && password.length > 0) {
            setValid(true)
            setTimeout(() => {
              setUser({
                id: '1',
                email: username,
                name: 'Name',
                lastname: 'Lastname',
                image: 'https://picsum.photos/200/300',
                accessToken: 'Token',
              })

              router.navigate('/')
            }, 2000)
          } else {
            setValid(false)
          }
        }}
        testID="signInButton">
        <Text style={apply(C.font4, C.weightBold, C.textWhite)}>Sign in</Text>
      </TouchableOpacity>
      {valid ? (
        <Text style={apply(C.font4, C.textGreen, C.selfCenter)}>Sign in successfully</Text>
      ) : null}
    </Layout>
  )
}

export default Login
