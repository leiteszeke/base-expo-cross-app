import Config from '#helpers/config'
import { Generic } from '#types'
import { usePathname } from 'expo-router'
import { Platform } from 'react-native'

export const useRouteName = () => {
  const pathname = usePathname()

  return pathname.replace('/', '')
}

export const encodeParams = (obj: Generic) => {
  return btoa(JSON.stringify(obj))
}

export const decodeParams = <T = Generic>(str?: string | string[]): T => {
  if (!str) {
    return {} as T
  }

  const string = Array.isArray(str) ? str[0] : str

  return JSON.parse(decodeURIComponent(escape(window.atob(string)))) as T
}

export const getSubdomain = () => {
  if (Platform.OS === 'web') {
    const hostname = window.location.hostname
    const subdomain = hostname
      .replace(`.${Config.domainAppUrl}`, '')
      .replace(Config.domainAppUrl, '')
    const reservedSubdomains = ['app', 'qa', 'clientes', 'precios', 'localhost', '']

    return !reservedSubdomains.includes(subdomain) && !isIPAddress(hostname, '192.168')
      ? subdomain
      : null
  }

  return null
}

export const isIPAddress = (ipString: string, startRange?: string) => {
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

  const isIp = ipPattern.test(ipString)

  if (startRange) {
    return isIp && ipString.startsWith(startRange)
  }

  return isIp
}

export const isPricePage = () => {
  if (Platform.OS === 'web') {
    const hostname = window.location.hostname
    const subdomain = hostname
      .replace(`.${Config.domainAppUrl}`, '')
      .replace(Config.domainAppUrl, '')

    return subdomain === 'precios' || window.location.pathname.startsWith('/items')
  }

  return false
}
