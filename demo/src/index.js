import React, { useState } from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import { GlobalClient } from 'drupal-jsonapi-client'

import DrupalImage from '../../src/DrupalImage'
import DrupalDateTime from '../../src/DrupalDateTime'
import DrupalLogin from '../../src/DrupalLogin'
import DrupalRegister from '../../src/DrupalRegister'
import DrupalAuthenticationProvider from '../../src/DrupalAuthenticationProvider'

const Demo = () => {
  const [files, setFiles] = useState([])
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [baseUrl, setBaseUrl] = useState('https://example.pantheonsite.io')

  return (
    <div>
      <h1>react-drupal</h1>
      <h2>Configuration</h2>
      <label htmlFor="base-url">Drupal Site URL</label>
      <input style={{ width: '250px' }} id="base-url" type="url" value={baseUrl} onChange={(e) => { setBaseUrl(e.target.value) }} />

      <h2>DrupalImage</h2>
      <DrupalImage
        id={'field_image'}
        limit={1}
        field={'field_image'}
        label={'Field Image'}
        entityType={'node'}
        entityBundle={'article'}
        baseURL={baseUrl}
        authorization={'username:password'}
        fileUUIDs={files}
        onChange={setFiles}
      />

      <h2>DrupalDateTime</h2>
      <DrupalDateTime id={'field_datetime'} date={date} onChange={setDate} />
      
      <h2>DrupalLogin</h2>
      <DrupalLogin
        expireAfterMinutes={1}
        onAuthenticationChange={(jwt) => { GlobalClient.authorization = jwt ? `Bearer ${jwt}` : null }} />

      <h2>DrupalRegister</h2>
      <DrupalRegister
        expireAfterMinutes={1}
        onAuthenticationChange={(jwt) => { GlobalClient.authorization = jwt ? `Bearer ${jwt}` : null }} />

      <h2>DrupalAuthenticationProvider</h2>
      <DrupalAuthenticationProvider
        onInit={(jwt) => { GlobalClient.authorization = jwt ? `Bearer ${jwt}` : null }}
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
