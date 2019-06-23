import React, { useState } from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import {GlobalClient} from 'drupal-jsonapi-client';

import DrupalImage from '../../src/DrupalImage'
import DrupalDateTime from '../../src/DrupalDateTime'
import DrupalLogin from '../../src/DrupalLogin'
import DrupalRegister from '../../src/DrupalRegister'
import DrupalAuthenticationProvider from '../../src/DrupalAuthenticationProvider'

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
      
      <h2>DrupalLogin</h2>
      <DrupalLogin onAuthenticated={console.log} />

      <h2>DrupalRegister</h2>
      <DrupalRegister onAuthenticated={console.log} />

      <h2>DrupalAuthenticated</h2>
      <DrupalAuthenticationProvider
        onInit={() => console.log('init')}
        onChange={console.log}>
        {({ jwt }) => jwt ? (
          <React.Fragment>
            <h3>JWT</h3>
            <pre><code>{jwt}</code></pre>
          </React.Fragment>
        ) : null}
      </DrupalAuthenticationProvider>
    </div>
  )
}

render(<Demo/>, document.querySelector('#demo'))
