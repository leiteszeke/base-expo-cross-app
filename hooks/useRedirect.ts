import { NavigationProp, useNavigation } from '@react-navigation/native'

import { RootStackParamList, ScreensParamList } from '#types'

import { useDevice } from './useDevice'

const RootStack = 'Root'

export const useRedirect = () => {
  const { isWeb } = useDevice()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

  if (isWeb) {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    const { sc: screen, ...restParams } = params

    if (screen) {
      navigate(RootStack, {
        screen: screen as keyof ScreensParamList,
        params: restParams as any,
      })
    }
  }

  return null
}

export default useRedirect
