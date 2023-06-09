export const formatCurrencyNumber = (value?: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(value ?? 0)

export const calculatePercentage = (total: number, partial: number) => {
  return Number(((partial * 100) / total).toFixed(2))
}

export const calculateValue = (total: number, partial: number) => {
  return Number(((partial * total) / 100).toFixed(2))
}

export const decimalNumber = (value: string, max?: number) => {
  const regex = /^\d+(\.{1})?(\d+)?$/
  const isValid = regex.test(value)

  if (!isValid && value !== '') {
    return null
  }

  let val: string | number = value

  if (max && Number(val) > max) {
    val = max
  }

  return val
}
