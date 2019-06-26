import 'regenerator-runtime/runtime'
import { File as FileEntity, GlobalClient, User } from 'drupal-jsonapi-client'
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import moment from 'moment'

import DrupalImage from '../../src/DrupalImage'
import DrupalDateTime from '../../src/DrupalDateTime'
import DrupalDatePicker from '../../src/DrupalDatePicker'
import DrupalLogin from '../../src/DrupalLogin'
import DrupalRegister from '../../src/DrupalRegister'
import DrupalAuthenticationProvider from '../../src/DrupalAuthenticationProvider'

const Demo = () => {
  const [images, setImages] = useState([])
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [baseUrl, setBaseUrl] = useState('https://example.pantheonsite.io')
  const [entityType, setEntityType] = useState('node')
  const [entityBundle, setEntityBundle] = useState('article')
  const [fieldName, setFieldName] = useState('field_image')

  useEffect(() => {
    GlobalClient.baseUrl = baseUrl
  }, [baseUrl])

  return (
    <div>
      <h1>react-drupal</h1>
      <h2>Configuration</h2>
      <label htmlFor="base-url">Drupal Site URL</label>
      <input style={{ width: '250px' }} id="base-url" type="url" value={baseUrl} onChange={(e) => { setBaseUrl(e.target.value) }} />
      <br />
      <label htmlFor="entity-type">Entity Type</label>
      <input style={{ width: '250px' }} id="entity-type" type="text" value={entityType} onChange={(e) => { setEntityType(e.target.value) }} />
      <br />
      <label htmlFor="entity-bundle">Entity Bundle</label>
      <input style={{ width: '250px' }} id="entity-bundle" type="text" value={entityBundle} onChange={(e) => { setEntityBundle(e.target.value) }} />
      <br />
      <label htmlFor="field-name">Field Name</label>
      <input style={{ width: '250px' }} id="field-name" type="text" value={fieldName} onChange={(e) => { setFieldName(e.target.value) }} />

      <h2>DrupalLogin</h2>
      <DrupalLogin
        expireAfterMinutes={1}
        onLogin={(username, password) => User.Login(username, password)}
        onAuthenticationChange={({ jwt }) => { GlobalClient.authorization = jwt ? `Bearer ${jwt}` : null }} />

      <h2>DrupalRegister</h2>
      <DrupalRegister
        expireAfterMinutes={1}
        onLogin={(username, password) => User.Login(username, password)}
        onRegister={(email, username, password) => User.Register(email, username, password)}
        onAuthenticationChange={({ jwt }) => { GlobalClient.authorization = jwt ? `Bearer ${jwt}` : null }} />

      <h2>DrupalAuthenticationProvider</h2>
      <DrupalAuthenticationProvider
        onInit={({ jwt }) => { GlobalClient.authorization = jwt ? `Bearer ${jwt}` : null }}
        onChange={({ jwt }) => { GlobalClient.authorization = jwt ? `Bearer ${jwt}` : null }}>
        {({ jwt }) => jwt ? (
          <React.Fragment>
            <h3>JWT</h3>
            <pre><code>{jwt}</code></pre>
          </React.Fragment>
        ) : null}
      </DrupalAuthenticationProvider>

      <h2>DrupalImage</h2>
      <DrupalImage
        images={images}
        limit={1}
        accept="image/*"
        onDelete={async (id) => {
          console.log(`Please delete this image: ${id}`)
          await FileEntity.Delete(id)
          setImages(images.filter(image => image.id !== id))
        }}
        onUpload={async (image) => {
          console.log('Please upload this image', image)
          const file = await FileEntity.Upload(image, null, entityType, entityBundle, fieldName)
          setImages([
            ...images,
            {
              id: file.entityUuid,
              name: image.name,
              url: `${baseUrl}${file.uri.url}`
            }
          ])
        }}
        />

      <h2>DrupalDateTime</h2>
      <DrupalDateTime
        date={date}
        onChange={setDate}/>
      
      <h2>DrupalDatePicker</h2>
      <DrupalDatePicker
        date={date}
        onChange={setDate}/>
    </div>
  )
}

render(<Demo/>, document.querySelector('#demo'))