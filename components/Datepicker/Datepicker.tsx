import { useDevice } from '#hooks/useDevice'
import { Icon } from '@gluestack-ui/themed'
import { DatepickerProps, ForwardedDatepickerInputProps } from './Datepicker.types'
import DatepickerInput from './DatepickerInput'
import { Calendar, ChevronDown } from 'lucide-react-native'
import C, { apply } from 'consistencss'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'

const Input = ({ value, onValueChange, containerStyle }: DatepickerProps) => {
  const { isWeb } = useDevice()
  const pickerRef = useRef<ForwardedDatepickerInputProps>(null)
  const [date, setDate] = useState<Date | undefined>(value ?? undefined)

  const saveDate = (selectedDate: Date) => {
    setDate(selectedDate)
    pickerRef.current?.closePicker()
  }

  useEffect(() => {
    if (date) {
      const d = new Date(date).toString()

      if (d === 'Invalid Date') {
        onValueChange?.(new Date())

        return
      }

      onValueChange?.(date)
    }
  }, [date])

  useEffect(() => {
    if (value) {
      setDate(value)
    }
  }, [value])

  const pickerProps = isWeb
    ? {
        date,
        onChange: saveDate,
      }
    : {
        date,
        onConfirm: saveDate,
        onCancel: () => {
          pickerRef.current?.closePicker()
        },
      }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={apply(
        C.h8,
        C.bgWhite,
        C.radius2,
        C.borderMinimum,
        C.borderG300,
        C.row,
        C.itemsCenter,
        C.px2,
        C.selfStart,
        containerStyle,
      )}
      onPress={() => pickerRef.current?.focus()}>
      <Icon as={Calendar} size="md" mr="$2" />

      <DatepickerInput ref={pickerRef} {...pickerProps} />

      <Icon as={ChevronDown} size="md" ml="$2" />
    </TouchableOpacity>
  )
}

export default Input
