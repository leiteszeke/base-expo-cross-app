import { FontAwesome } from '@expo/vector-icons'
import C, { classNames, apply } from 'consistencss'

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAndroidBack } from '#hooks/useAndroidBack'

import { LayoutProps } from './Layout.types'
import { router } from 'expo-router'

const Layout = ({
  avoiKeyboard = false,
  bg,
  children,
  contentStyle,
  headerProps,
  style,
}: LayoutProps) => {
  const insets = useSafeAreaInsets()

  const RightContent = headerProps?.rightContent ? (
    headerProps.rightContent
  ) : (
    <View
      style={classNames({
        'h10 w10': typeof headerProps?.title !== 'string' || headerProps.withBack,
      })}
    />
  )

  useAndroidBack(router.back)

  const Container = bg ? ImageBackground : View

  return (
    // @ts-expect-error check type
    <Container
      source={bg}
      style={apply(C.flex, style, { paddingTop: insets.top }, Platform.OS === 'web' && C.pt2)}>
      {headerProps && (
        <View style={apply(C.h10, C.mt1, C.row, C.itemsCenter, C.justifyBetween)}>
          {headerProps.withBack && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={router.back}
              style={apply(C.h10, C.itemsCenter, C.justifyCenter, C.w10)}>
              <FontAwesome size={20} name="chevron-left" />
            </TouchableOpacity>
          )}

          {headerProps.title ? (
            <Text
              style={apply(C.alignCenter, C.flex, C.font6, C.line11, C.familyBold, C.uppercase)}
              numberOfLines={1}>
              {headerProps.title}
            </Text>
          ) : (
            <View style={C.flex} />
          )}

          {RightContent}
        </View>
      )}
      {avoiKeyboard ? (
        <View style={apply(C.flex, contentStyle)}>{children}</View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={apply(C.flex, contentStyle)}>
          {children}
        </KeyboardAvoidingView>
      )}
    </Container>
  )
}

export default Layout
