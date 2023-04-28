import { EventRegister } from 'react-native-event-listeners'

const MyEvents = {
  addEventListener: (type: string, listener: any, _?: any) =>
    EventRegister.addEventListener(type, listener),

  removeEventListener: (type: string, _: any) => EventRegister.removeEventListener(type),

  removeAllListeners: () => EventRegister.removeAllListeners(),

  emit: (eventName: string, data?: any) => {
    EventRegister.emit(eventName, data)
  },
}

export default MyEvents
