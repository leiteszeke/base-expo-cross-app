import C, { apply } from 'consistencss'

import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react'
import { Text } from 'react-native'
import DatePicker from 'react-native-date-picker'

import { formatDate } from '#helpers/dates'

import { ForwardedDatepickerInputProps, MobilePicker } from './Datepicker.types'

const DatepickerInput: ForwardRefRenderFunction<ForwardedDatepickerInputProps, MobilePicker> = (
  props,
  ref,
) => {
  const [open, setOpen] = useState<boolean>(false)

  useImperativeHandle(
    ref,
    () => ({
      focus: () => setOpen(true),
      openPicker: () => setOpen(true),
      closePicker: () => setOpen(false),
    }),
    [],
  )

  const defaultDate = new Date()

  return (
    <>
      <Text style={apply(C.familyRegular, C.font3, C.mx1, C.line4, C.mtDouble, C.alignCenter)}>
        {props.date ? formatDate(props.date, 'dd/MM/yyyy') : props.placeholder ?? ''}
      </Text>

      <DatePicker {...props} date={props.date ?? defaultDate} modal open={open} />
    </>
  )
}

export default forwardRef(DatepickerInput)
