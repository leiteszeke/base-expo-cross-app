import { resetStore } from '#store'
import { Button, ButtonText, Heading } from '@gluestack-ui/themed'
import C, { apply } from 'consistencss'
import { router } from 'expo-router'
import { View } from 'react-native'

const Home = () => {
  return (
    <View style={apply(C.itemsCenter, C.flex, C.justifyCenter)}>
      <Heading>Home Page</Heading>

      <Button
        onPress={() => {
          resetStore()
          router.navigate('/')
        }}>
        <ButtonText>Cerrar sesion</ButtonText>
      </Button>
    </View>
  )
}

export default Home
