import React, { useState, useEffect } from 'react'
import DrupalImagePreview from './DrupalImagePreview'
import { Entity, File as FileEntity, GlobalClient, Filter } from 'drupal-jsonapi-client'
import './styles.css'

export const IconAdd = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" className="primary"/>
    <path fill="#fff" className="secondary" d="M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4z"/>
  </svg>
)

const DrupalImage = (props) => {
  const { 
    id,
    limit,
    field,
    label,
    nodeType,
    baseURL,
    authorization,
    fileUUIDs,
    onChange,
    sendCookies
  } = props 

  const [media, setMedia] = useState([])
  const [uploading, setUploading] = useState(false)

  GlobalClient.authorization = authorization ? `Basic ${btoa(authorization)}` : null
  GlobalClient.sendCookies = sendCookies
  GlobalClient.baseUrl = baseURL

  useEffect(() => {
    (async () => {
      if (fileUUIDs.length !== 0 && media.length === 0) {
        const files = await Entity.LoadMultiple({
          entityType: 'file',
          entityBundle: 'file',
          filter: new Filter({
            identifier: 'ids',
            path: 'id',
            operator: 'IN',
            value: fileUUIDs
          })
        })
        setMedia([...media, ...files.map(file => {
          return {
            name: file.filename,
            imageURL: file.uri.url,
            drupalUUID: file.entityUuid
          }
        })])
      }
    })()
  })
  
  return (
    <React.Fragment>
      {media.map(image => <DrupalImagePreview 
        key={image.name}
        name={image.name}
        image={baseURL + image.imageURL}
        deleteImage={() => {
          (new FileEntity(image.drupalUUID)).delete()
          const newMedia = media.filter(item => item.drupalUUID != image.drupalUUID)
          onChange(newMedia.map(item => item.drupalUUID))
          setMedia(newMedia)
        }}
      />)}
      {media.length < limit && <div className="media-image__wrapper">
        {label && <label htmlFor="media-image">{label}</label>}
        <div className="media-image__box">
          <input
            id="media-image"
            accept="image/*" 
            type="file"
            onChange={async event => {
              event.persist()
              setUploading(true)
              const localFile = event.target.files[0]
              const drupalResponse = await FileEntity.Upload(localFile, localFile.name, "node", nodeType, field)
              const newMedia = [...media, {
                name: localFile.name,
                imageURL: drupalResponse.uri.url,
                drupalUUID: drupalResponse.entityUuid
              }]
              setMedia(newMedia)
              onChange(newMedia.map(item => item.drupalUUID))
              setUploading(false)
              
              if (event.target)
                event.target.value = null
            }}
          />
        </div>
        { uploading && 'uploading...' }
      </div>}
    </React.Fragment>
  )
}

export default DrupalImage