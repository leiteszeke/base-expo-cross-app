import * as Device from 'expo-device'

import { Platform, Dimensions } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { AppVersion, DeviceData } from '#types'

export const getDeviceUUID = () => DeviceInfo.getUniqueIdSync()

export const getDeviceData = async (): Promise<DeviceData> => {
  const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')
  const { height: windowHeight, width: windowWidth } = Dimensions.get('window')

  const deviceType = await Device.getDeviceTypeAsync()

  return {
    currentVersion: AppVersion,
    deviceId: getDeviceUUID(),
    deviceType,
    deviceMeta: {
      brand: DeviceInfo.getBrand(),
      OS: Platform.OS,
      platform: DeviceInfo.getDeviceId(),
      screenHeight,
      screenWidth,
      windowHeight,
      windowWidth,
    },
  }
}
