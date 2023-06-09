import C, { apply, extend } from 'consistencss'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'

import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import AnalyticsProvider from '#contexts/Analytics'
import { getDeviceData } from '#helpers/device'
import { useAppStore } from '#store'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

extend({
  sizing: {
    minimum: 1,
    double: 2,
    triple: 3,
    dozen: 10,
    third: '33%',
    fullPlus: '100.5%',
  },
  components: {
    Text: apply({ fontFamily: 'Poppins_400Regular' }, C.textBlack, C.font4, C.line5),
  },
  classes: {
    none: apply({ display: 'none' }),
  },
  fonts: {
    light: 'Poppins_300Light',
    regular: 'Poppins_400Regular',
    semibold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },
})

export default function App() {
  const isLoadingComplete = useCachedResources()
  const { setDeviceType } = useAppStore()

  const fetchDeviceType = async () => {
    const deviceData = await getDeviceData()

    setDeviceType(deviceData.deviceType)
  }

  useEffect(() => {
    fetchDeviceType()
  }, [])

  if (!isLoadingComplete) {
    return null
  }

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <AnalyticsProvider>
          <Navigation />
          <StatusBar />
        </AnalyticsProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  )
}
