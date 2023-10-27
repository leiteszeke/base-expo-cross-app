import AsyncStorage from '@react-native-async-storage/async-storage'
import { DeviceType } from 'expo-device'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { createStore as createVanilla } from 'zustand/vanilla'

import { Platform } from 'react-native'

import Config from '#helpers/config'
import { AppVersion } from '#types'

import { State, Set, Get } from './store.types'
import { usersInitialState, userStore } from './users'
import { GenericState } from './generic'

const Storage = Platform.OS !== 'web' ? AsyncStorage : localStorage

export const genericInitialState = {
  deviceType: DeviceType.DESKTOP,
}

export const initialState = {
  ...genericInitialState,
  ...usersInitialState,
}

export const genericState = (set: Set<GenericState>, get: Get<GenericState>): GenericState => ({
  ...genericInitialState,

  setDeviceType: (type: DeviceType) => set((state) => ({ ...state, deviceType: type })),

  isPhone: () => get().deviceType === DeviceType.PHONE,
  isTablet: () => get().deviceType === DeviceType.TABLET,
  isDesktop: () => get().deviceType === DeviceType.DESKTOP,

  resetStore: () =>
    set((state) => ({
      ...state,
      ...initialState,
    })),
})

const storeObject = (set: Set<State>, get: Get<State>): State => ({
  ...genericState(set, get),
  ...userStore(set, get),
})

const storeConfig = {
  name: `${Config.sessionKey}@${AppVersion}`,
  storage: createJSONStorage<State>(() => Storage),
}

const clearOldKeys = () => {
  const envKey = Config.sessionKey
  const currentKey = `${Config.sessionKey}@${AppVersion}`
  const backupKeys = `Backup${Config.sessionKey}`
  const keys = Object.keys(localStorage).filter(
    (key) => key.includes(envKey) && key !== currentKey && key !== backupKeys,
  )

  keys.forEach((key) => {
    localStorage.removeItem(key)
  })
}

export const useAppStore = create<State, [['zustand/devtools', never], ['zustand/persist', State]]>(
  devtools(
    persist(
      (set, get) => ({
        ...storeObject(set, get),
      }),
      storeConfig,
    ),
  ),
)

export const AppStore = createVanilla<
  State,
  [['zustand/devtools', never], ['zustand/persist', State]]
>(
  devtools(
    persist(
      (set, get) => ({
        ...storeObject(set, get),
      }),
      storeConfig,
    ),
  ),
)

if (Platform.OS === 'web') {
  clearOldKeys()
}
