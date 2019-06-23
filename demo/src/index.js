import React, { useState } from 'react'
import { render } from 'react-dom'
import DrupalImage from '../../src/DrupalImage'
import moment from 'moment'
import DrupalDateTime from '../../src/DrupalDateTime'

const Demo = () => {
  const [files, setFiles] = useState([])
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))

  return (
    <div>
      <h1>react-drupal</h1>
      <h2>DrupalImage</h2>
      <DrupalImage
        id={'field_image'}
        limit={1}
        field={'field_image'}
        label={'Field Image'}
        entityType={'node'}
        entityBundle={'article'}
        baseURL={'https://example.pantheonsite.io'}
        authorization={'username:password'}
        fileUUIDs={files}
        onChange={setFiles}
      />
      <h2>DrupalDateTime</h2>
      <DrupalDateTime
        id={'field_datetime'}
        date={date}
        onChange={setDate}
        />
    </div>
  )
}

render(<Demo/>, document.querySelector('#demo'))
