import 'regenerator-runtime/runtime'
import { File as FileEntity, GlobalClient } from 'drupal-jsonapi-client'
import React, { useState } from 'react'
import { render } from 'react-dom'
import moment from 'moment'

import DrupalImage from '../../src/DrupalImage'
import DrupalDateTime from '../../src/DrupalDateTime'
import DrupalDatePicker from '../../src/DrupalDatePicker'

const Demo = () => {
  const [images, setImages] = useState([])
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))

  return (
    <div>
      <h1>react-drupal</h1>

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
          GlobalClient.baseUrl = 'https://example.pantheonsite.io'
          GlobalClient.authorization = `Basic ${btoa('username:password')}`
          const file = await FileEntity.Upload(image, null, 'node', 'article', 'field_image')
          setImages([
            ...images,
            {
              id: file.entityUuid,
              name: image.name,
              url: `https://example.pantheonsite.io${file.uri.url}`
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
