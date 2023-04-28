import { DeviceType } from 'expo-device'

import { Platform } from 'react-native'

import { useAppStore } from '#store'

export const useDevice = () => {
  const { deviceType } = useAppStore()

  return {
    isPhone: deviceType === DeviceType.PHONE,
    isTablet: deviceType === DeviceType.TABLET,
    isDesktop: deviceType === DeviceType.DESKTOP || deviceType === DeviceType.UNKNOWN,
    isWeb: Platform.OS === 'web',
    isAndroid: Platform.OS === 'android',
    isApple: Platform.OS === 'ios',
  }
}
