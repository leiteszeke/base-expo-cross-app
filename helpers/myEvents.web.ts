const MyEvents = {
  addEventListener: (type: string, listener: any, props?: any) =>
    document.addEventListener(type, listener, props),

  removeEventListener: (type: string, listener: any) =>
    document.removeEventListener(type, listener),

  removeAllListeners: () => {},

  emit: (eventName: string, data?: any) => {
    if (data) {
      document.dispatchEvent(new CustomEvent(eventName, { detail: data }))
    } else {
      document.dispatchEvent(new Event(eventName))
    }
  },
}

export default MyEvents
