import { useAppStore } from '#store'
import { Redirect, Stack } from 'expo-router'

export default function App() {
  const { user } = useAppStore()

  if (!user) {
    return <Redirect href="/login" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
