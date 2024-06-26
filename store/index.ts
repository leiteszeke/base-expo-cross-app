import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { createStore as createVanilla } from 'zustand/vanilla'

import { Platform } from 'react-native'

import Config from '#helpers/config'
import { AppVersion } from '#types'

import { State, Set, Get } from './store.types'
import { userStore } from './users'
import { genericStore } from './generic'

const Storage = Platform.OS !== 'web' ? AsyncStorage : localStorage

const sliceResetFns = new globalThis.Set<() => void>()

export const resetStore = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn()
  })
}

const storeObject = (set: Set<State>, get: Get<State>): State => ({
  ...genericStore(set, get, sliceResetFns),
  ...userStore(set, get, sliceResetFns),
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
