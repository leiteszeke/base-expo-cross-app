import { useLayoutEffect, useState } from 'react'
import { Dimensions, EmitterSubscription } from 'react-native'

import { useDevice } from './useDevice'

export const useWindowSize = (): { height: number; width: number } => {
  const { isWeb } = useDevice()
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    let listener: EmitterSubscription

    const updateSize = () => {
      if (isWeb) {
        setSize([window.innerWidth, window.innerHeight])
      }
    }

    if (isWeb) {
      window.addEventListener('resize', updateSize)
    } else {
      listener = Dimensions.addEventListener('change', updateSize)
    }

    updateSize()

    return () => {
      if (isWeb) {
        window.removeEventListener('resize', updateSize)
      } else {
        listener.remove()
      }
    }
  }, [])

  return {
    height: size[1],
    width: size[0],
  }
}
