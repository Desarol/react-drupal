import React, { useState, useEffect } from 'react'
import moment from 'moment'

/**
 * Component DrupalDateTime.
 * 
 * Exports a component which can be used to manipulate a "datetime" field on a
 * Drupal entity. This is more appropriate when you need to set a time as well as date.
 */
export default ({
  date,
  onChange,
  includeTime = true
}) => {
  const format = includeTime ? 'YYYY-MM-DDTHH:mmZZ' : 'YYYY-MM-DD'
  const dateMoment = typeof date === 'string' ? moment(date) : moment()
  const [stateTime, setTime] = useState(dateMoment.format('HH:ss'))
  const [stateDate, setDate] = useState(dateMoment.format('YYYY-MM-DD'))
  useEffect(() => {
    setDate(dateMoment.format('YYYY-MM-DD'))
    setTime(dateMoment.format('HH:mm'))
  }, [date])

  return (
    <div className="drupal-datetime">
      <input
        type="date"
        value={stateDate}
        onChange={(e) => {
          e.persist();
          const nextDate = e.target.value
          onChange(moment(`${nextDate}T${stateTime}`).format(format))
          setDate(nextDate)
        }} />
      {includeTime && (
        <input
          type="time"
          value={stateTime}
          onChange={(e) => {
            e.persist();
            const nextTime = e.target.value
            onChange(moment(`${stateDate}T${nextTime}`).format(format))
            setTime(nextTime)
          }} />
      )}
    </div>
  )
}