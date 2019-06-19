import React, { useState, useEffect } from 'react'
import idx from 'idx'
import Dropzone from 'react-dropzone'
import ImagePreview from '../ImagePreview'
import { Entity, File as FileEntity, GlobalClient } from 'drupal-jsonapi-client'
import './styles.css'

export const IconAdd = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" className="primary"/>
    <path fill="#fff" className="secondary" d="M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4z"/>
  </svg>
)

const MediaImage = (props) => {
  const { 
    id,
    field,
    label,
    nodeType,
    baseURL,
    authorization,
    fileUUID,
    onChange
  } = props 

  const [media, setMedia] = useState([])
  const [uploading, setUploading] = useState(false)

  if (window.location.host.includes('localhost')) {
    GlobalClient.authorization = `Basic ${btoa(authorization)}`
  } else {
    GlobalClient.sendCookies = true
  }
  
  GlobalClient.transport = window.fetch.bind(window)
  GlobalClient.baseUrl = baseURL

  useEffect(() => {
    (async () => {
      if (fileUUID && !remoteMedia && !localPreview) {
        const file = await Entity.Load('file', 'file', fileUUID)
        setMedia(file)
      }
    })()
  })

  return (
    <React.Fragment>
      {media.map(image => <ImagePreview 
        key={image.localFile.name}
        image={baseURL + image.imageURL}
      />)}
      <input
        accept="image/*" 
        type="file"
        onChange={async event => {
          event.persist()
          const localFile = event.target.files[0]
          const drupalResponse = await FileEntity.Upload(localFile, localFile.name, "node", nodeType, field)

          setMedia([...media, {
            localFile,
            imageURL: drupalResponse.uri.url
          }])
          onChange(drupalResponse.entityUuid)
          
          if(event.target)
            event.target.value = null
        }}
      />
      { uploading && 'loading' }
    </React.Fragment>
  )
}

export default MediaImage