import ExpoMixpanelAnalytics from '@bothrs/expo-mixpanel-analytics'

import React, {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import { clearMixpanel, initAnalytics, mixpanelEvent } from '#helpers/analytics'
import Config from '#helpers/config'
import MyEvents from '#helpers/myEvents'
import { useAppStore } from '#store'
import { EventKey, LogEvent, MixPanel, User } from '#types'

type AnalyticsContextProps = {
  mixpanel: React.MutableRefObject<MixPanel>
}

export const AnalyticsContext = createContext<Partial<AnalyticsContextProps>>({})

const AnonymousUser = {
  name: 'John',
  lastname: 'Doe',
  email: 'john.doe@example.com',
  token: '',
}

export const AnalyticsProvider = ({ children }: PropsWithChildren<{}>) => {
  const mixpanelRef = useRef<MixPanel>()
  const { user } = useAppStore()

  const init = useCallback(async () => {
    if (Config.useMixpanelAnalytics && Config.mixpanelToken) {
      if (user) {
        initAnalytics(user, mixpanelRef as MutableRefObject<MixPanel>)
      } else {
        initAnalytics(AnonymousUser as unknown as User, mixpanelRef as MutableRefObject<MixPanel>)
      }
    }
  }, [user])

  useEffect(() => {
    init()

    MyEvents.addEventListener(EventKey.ScreenView, (screenName: string) => {
      mixpanelEvent(mixpanelRef as MutableRefObject<ExpoMixpanelAnalytics>, EventKey.ScreenView, {
        screenName,
      })
    })

    MyEvents.addEventListener(EventKey.LogEvent, ({ eventName, eventData }: LogEvent) =>
      mixpanelEvent(mixpanelRef as MutableRefObject<ExpoMixpanelAnalytics>, eventName, eventData),
    )

    MyEvents.addEventListener(EventKey.Logout, () => {
      clearMixpanel(mixpanelRef as MutableRefObject<ExpoMixpanelAnalytics>)
    })

    return () => {
      clearMixpanel(mixpanelRef as MutableRefObject<ExpoMixpanelAnalytics>)
      MyEvents.removeAllListeners()
    }
  }, [init])

  return (
    <AnalyticsContext.Provider
      value={{ mixpanel: mixpanelRef as MutableRefObject<ExpoMixpanelAnalytics> }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export default AnalyticsProvider
