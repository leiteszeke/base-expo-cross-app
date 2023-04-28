import Mixpanel, { OverridedMixpanel } from 'mixpanel-browser'

import { MutableRefObject } from 'react'

import Config from '#helpers/config'
import { getDeviceData } from '#helpers/device'
import { AppVersion, EventKey, Generic, MixPanel, User } from '#types'
import { AppStore } from '#store'

type UserData = Pick<User, 'id' | 'name' | 'email' | 'lastname'>

const getUserData = async (user?: User | null) => {
  let innerUser = user

  if (!user) {
    innerUser = AppStore.getState().user
  }

  const userProps: Partial<UserData> = {}
  const deviceData = await getDeviceData()

  if (innerUser) {
    userProps.id = innerUser.id
    userProps.email = innerUser.email
    userProps.name = innerUser.name
    userProps.lastname = innerUser.lastname
  }

  const extraProps = {
    env: Config.env,
    currentVersion: deviceData.currentVersion,
    OS: deviceData.deviceMeta.OS,
    appVersion: AppVersion,
  }

  return {
    userProps,
    extraProps,
  }
}

export const initAnalytics = async (user?: User, _?: MutableRefObject<MixPanel>) => {
  const { userProps, extraProps } = await getUserData(user)

  if (Config.useMixpanelAnalytics && Config.mixpanelToken) {
    const peopleConfig = {
      ...userProps,
      ...extraProps,
    }

    Mixpanel?.init(Config.mixpanelToken)

    if (peopleConfig.id) {
      Mixpanel?.identify(peopleConfig.id?.toString())
    }

    Mixpanel?.register(peopleConfig)
  }
}

export const logEvent = (eventName: string, eventData?: Generic) => {
  mixpanelEvent(eventName, eventData)
}

export const logScreenView = async (screenName: string) => {
  mixpanelEvent(EventKey.ScreenView, { screenName })
}

export const mixpanelEvent = async (eventName: string, props?: Generic) => {
  if (Config.useMixpanelAnalytics) {
    await initAnalytics()
    Mixpanel?.track(eventName, props)
  }
}

export const clearMixpanel = async (_: MutableRefObject<OverridedMixpanel>) => {
  if (Config.useMixpanelAnalytics) {
    await initAnalytics()
    Mixpanel?.reset()
  }
}
