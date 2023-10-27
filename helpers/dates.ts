import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'

import { errorHandler } from './reporting'

export const formatDate = (date: Date, formatStr: string = 'yyyy-MM-dd') => {
  try {
    return format(date, formatStr, { locale: es })
  } catch (e: any) {
    errorHandler(new Error('date_error'), e)

    return ''
  }
}

export const parseToDate = (date: string, inputFormat: string = 'yyyy-MM-dd') =>
  parse(date, inputFormat, new Date())
