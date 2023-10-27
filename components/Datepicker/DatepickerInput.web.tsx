import { formatDate, parseToDate } from '#helpers/dates'
import { ForwardedWebPicker, WebPicker } from './Datepicker.types'
import React, {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import styled from 'styled-components'

const Picker = styled.input`
  ::-webkit-inner-spin-button {
    display: none;
  }
  ::-webkit-calendar-picker-indicator {
    display: none;
  }
`

const DatepickerInput: ForwardRefRenderFunction<ForwardedWebPicker, WebPicker> = (
  { onChange, ...props },
  ref,
) => {
  const inputRef = useRef<HTMLInputElement & { showPicker: VoidFunction }>(null)

  const focus = () => {
    inputRef.current?.showPicker()
  }

  const blur = () => {
    inputRef.current?.blur()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.nativeEvent?.target) {
      // @ts-expect-error - we don't have a type for the nativeEvent.target
      onChange(parseToDate(e.nativeEvent.target.value))
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      focus: () => focus(),
      openPicker: () => focus(),
      closePicker: () => blur(),
    }),
    [focus],
  )

  const defaultDate = useMemo(() => {
    if (props.date) {
      const d = new Date(props.date).toString()

      if (d === 'Invalid Date') {
        return undefined
      }

      return formatDate(props.date)
    }

    return undefined
  }, [props.date])

  return (
    <Picker
      {...props}
      onChange={handleChange}
      type="date"
      ref={inputRef}
      value={defaultDate}
      style={{
        border: 0,
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        textAlign: 'center',
      }}
    />
  )
}

export default forwardRef(DatepickerInput)
