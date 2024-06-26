import Constants from 'expo-constants'

import { Env } from '#types'

const parseBoolean = (value: string | boolean) => {
  if (value === true || value === 'true') {
    return true
  }

  return false
}

const envValues = Constants.expoConfig?.extra as EnvConfig

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

type EnvConfig = {
  env: Env
  apiUrl: string
  wsUrl: string

  sessionKey: string
  useMixpanelAnalytics: boolean
  mixpanelToken: string

  firebaseConfig: FirebaseConfig

  sentryDsn: string

  domainAppUrl: string
  showMaintenance: boolean
}

const Config: EnvConfig = {
  env: envValues.env,
  apiUrl: envValues.apiUrl,
  wsUrl: envValues.wsUrl,

  sessionKey: envValues.sessionKey,
  useMixpanelAnalytics: parseBoolean(envValues.useMixpanelAnalytics),
  mixpanelToken: envValues.mixpanelToken,

  firebaseConfig: envValues.firebaseConfig,

  sentryDsn: envValues.sentryDsn,

  domainAppUrl: envValues.domainAppUrl,
  showMaintenance: envValues.showMaintenance,
}

export default Config
