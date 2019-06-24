import React, { useState, useEffect } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

/**
 * Component DrupalDatePicker.
 * 
 * Exports a component which can be used to manipulate a "datetime" field on a
 * Drupal entity. This doesn't let you set a time.
 */
export default ({ id, date, onChange }) => {
  const [stateDate, setDate] = useState()
  const [focused, setFocused] = useState()
  useEffect(() => { setDate(moment(date)) }, [date])

  return (
    <SingleDatePicker
      id={id}
      date={stateDate}
      focused={focused}
      onDateChange={newDate => {
        onChange(newDate.format('YYYY-MM-DD'))
        setDate(stateDate)
      }}
      onFocusChange={({ focused }) => setFocused(focused)}
      />
  )
}