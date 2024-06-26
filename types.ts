import ExpoMixpanelAnalytics from '@bothrs/expo-mixpanel-analytics'
import { OverridedMixpanel } from 'mixpanel-browser'

import { DeviceType } from 'expo-device'

import packageJson from './package.json'

export type MixPanel = ExpoMixpanelAnalytics | OverridedMixpanel

export enum EventKey {
  ScreenView = 'ScreenView',
  Logout = 'Logout',
  LogEvent = 'LogEvent',
}

export type LogEvent = {
  eventName: string
  eventData: Generic
}

export enum Env {
  Local = 'local',
  Dev = 'development',
  QA = 'qa',
  Production = 'production',
}

export type Generic<T = unknown> = Record<string, T>

export type MyEvent = {
  detail: string
}

export const AppVersion = packageJson.version

export type DeviceData = {
  currentVersion: string
  deviceId: string
  deviceType: DeviceType
  deviceMeta: {
    brand: string
    OS: 'ios' | 'android' | 'web' | 'windows' | 'macos'
    platform: string
    screenHeight: number
    screenWidth: number
    windowHeight: number
    windowWidth: number
  }
}

export type WithMeta<T = unknown> = {
  data: T[]
  meta: {
    from: number
    lastPage: number
    page: number
    perPage: number
    to: number
    total: number
  }
}

export type GraphQLFind<T = unknown> = {
  data: T
}

export type GraphQLMeta<T = unknown> = {
  data: WithMeta<T>
}

export type GraphQLMutation<T = unknown> = {
  data: T
}

declare module 'yup' {
  interface StringSchema {
    integer(): StringSchema
    numeric(): StringSchema
  }

  interface DateSchema {
    afterThan(ref: any): DateSchema
  }
}

export enum KeyboardKey {
  Enter = 'Enter',
  Backspace = 'Backspace',
}

export type User = {
  id: string
  name: string
  lastname: string
  image: string
  email: string
}

export type UserWithToken = User & {
  accessToken: string
}

export type LoginUser = Pick<User, 'email'> & {
  password: string
}
