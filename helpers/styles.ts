import { apply, extend } from 'consistencss'

const extendStyles = () =>
  extend({
    sizing: {
      minimum: 1,
      double: 2,
      triple: 3,
      dozen: 10,
      third: '33%',
      fullPlus: '100.5%',
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

export default extendStyles
