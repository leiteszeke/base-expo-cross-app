import * as dotenv from 'dotenv'
import { ExpoConfig } from 'expo/config'

import { version, expoVersion } from './package.json'

const NODE_ENV = process.env.EXPO_PUBLIC_NODE_ENV
const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV
const BUNDLE_IDENTIFIER = process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER ?? 'com.leiteszeke.example'
const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME ?? 'Example App'
let envFile

if (APP_ENV) {
  envFile = `.env${APP_ENV ? `.${APP_ENV}` : ''}`
} else {
  envFile = `.env${NODE_ENV ? `.${NODE_ENV}` : ''}`
}

dotenv.config({
  path: envFile,
})

const restOpts: Partial<ExpoConfig> = {
  updates: {
    fallbackToCacheTimeout: 0,
  },
}

if (NODE_ENV === 'production' || APP_ENV === 'production') {
  restOpts.runtimeVersion = {
    policy: 'sdkVersion',
  }
}

const config: ExpoConfig = {
  name: APP_NAME,
  slug: 'exampleapp',
  version,
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  scheme: 'exampleapp',
  assetBundlePatterns: ['**/*'],
  updates: {
    fallbackToCacheTimeout: 0,
  },
  ios: {
    buildNumber: expoVersion.ios.toString(),
    bundleIdentifier: BUNDLE_IDENTIFIER,
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    supportsTablet: false,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    icon: './assets/icon.png',
    package: BUNDLE_IDENTIFIER,
    splash: {
      backgroundColor: '#ffffff',
      image: './assets/splash-android.png',
      resizeMode: 'contain',
    },
    versionCode: expoVersion.android,
  },
  web: {
    favicon: './assets/favicon.png',
    publicPath: './assets/images',
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    wsUrl: process.env.EXPO_PUBLIC_WS_URL,
    env: process.env.EXPO_PUBLIC_SITE_ENV,
    sessionKey: process.env.EXPO_PUBLIC_SESSION_KEY,
    useMixpanelAnalytics: process.env.EXPO_PUBLIC_USE_MIXPANEL_ANALYTICS,
    mixpanelToken: process.env.EXPO_PUBLIC_MIXPANEL_TOKEN,
    firebaseConfig: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseUrl: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  },
  plugins: [
    'sentry-expo',
    '@config-plugins/detox',
    'expo-localization',
    './plugins/withAndroidNamespace',
  ],
  ...restOpts,
}

export default config
