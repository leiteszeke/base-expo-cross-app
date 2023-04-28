import { DeviceType } from 'expo-device'
import { Set, Get } from './store.types'

export type GenericState = {
  deviceType: DeviceType

  setDeviceType: (type: DeviceType) => void
  isPhone: () => boolean
  isTablet: () => boolean
  isDesktop: () => boolean

  resetStore: () => void
}

export const genericInitialState = {
  deviceType: DeviceType.DESKTOP,
}

export const genericStore = (set: Set<GenericState>, get: Get<GenericState>): GenericState => ({
  ...genericInitialState,

  setDeviceType: (type: DeviceType) => set((state) => ({ ...state, deviceType: type })),

  isPhone: () => get().deviceType === DeviceType.PHONE,
  isTablet: () => get().deviceType === DeviceType.TABLET,
  isDesktop: () => get().deviceType === DeviceType.DESKTOP,

  resetStore: () =>
    set((state) => ({
      ...state,
      ...genericInitialState,
    })),
})
