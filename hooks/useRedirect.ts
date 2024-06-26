import { router } from 'expo-router'
import { useDevice } from './useDevice'

export const useRedirect = () => {
  const { isWeb } = useDevice()

  if (isWeb) {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    const { sc: screen, ...restParams } = params

    if (screen) {
      router.navigate({
        pathname: screen,
        params: restParams as any,
      })
    }
  }

  return null
}

export default useRedirect
