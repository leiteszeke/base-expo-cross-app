import { TextInputProps, ViewStyle } from 'react-native'
import { DatePickerProps } from 'react-native-date-picker'

export type DatepickerProps = Omit<TextInputProps, 'value'> & {
  value?: Date
  date?: Date
  containerStyle?: ViewStyle
  onValueChange?: (date: Date) => void
}

export type WebPicker = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { date?: Date; onChange: (date: Date) => void }

export type MobilePicker = Omit<DatePickerProps, 'date'> & {
  date?: Date
  placeholder?: string
}

export type DatepickerInputProps = MobilePicker | WebPicker

export type ForwardedWebPicker = {
  focus: () => void
}

export type ForwardedDatepickerInputProps = Partial<DatepickerInputProps> & {
  focus: () => void
  closePicker: () => void
  openPicker: () => void
}
