import { CaptureContext } from '@sentry/types'
import * as Sentry from 'sentry-expo'

import { Platform } from 'react-native'

import Config from '#helpers/config'
import { Env, User } from '#types'

import { getDeviceData } from './device'

const RNSentry = Platform.OS === 'web' ? Sentry.Browser : Sentry.Native

export const initSentry = async () => {
  const deviceData = await getDeviceData()

  if (Config.sentryDsn && Config.env !== Env.Local) {
    Sentry.init({
      enableNative: true,
      dsn: Config.sentryDsn,
      environment: Config.env,
      enableInExpoDevelopment: true,
      release: deviceData.currentVersion,
    })
  }
}

export const setTag = (tagName: string, value: string) => {
  RNSentry.setTag(tagName, value)
}

export const initErrorReporting = async (user: User) => {
  const deviceData = await getDeviceData()

  RNSentry.setUser({
    id: user.id.toString(),
    username: `${user.name} ${user.lastname}`,
    email: user.email,
  })

  setTag('version', deviceData.currentVersion)
  setTag('platform', deviceData.deviceMeta.OS)
}

export const captureException = (exception: unknown, context?: CaptureContext) => {
  // @ts-expect-error Types collision between Browser and Native
  RNSentry.captureException(exception, context)
}

export const errorHandler = (_: Error, stackTrace: string) => {
  captureException(stackTrace)
}

export const captureMessage = (message: string, context?: CaptureContext) => {
  // @ts-expect-error Types collision between Browser and Native
  RNSentry.captureMessage(message, context)
}

export const captureEvent = (event: Sentry.Browser.Event) => {
  RNSentry.captureEvent(event)
}
