import React, { useState, useEffect } from 'react'
import idx from 'idx'
import Dropzone from 'react-dropzone'
import { Entity, File as FileEntity, GlobalClient } from 'drupal-jsonapi-client'
import './styles.css'

export const IconAdd = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" className="primary"/>
    <path fill="#fff" className="secondary" d="M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4z"/>
  </svg>
)

const binaryToBase64 = (buffer) => {
  let binary = ''
  let bytes = new Uint8Array(buffer)
  const len = bytes.byteLength

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary)
}

const getBinaryContent = (file) => {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = (event) => {
      resolve(event.target.result);
    };
    fr.readAsArrayBuffer(file);
  });
};

const MediaFormField = ({ label, id, src, onChange }) => (
  <div className="form__field">
    {label && <label className="form__label" htmlFor={id}>{label}</label>}
    <Dropzone multiple={false} onDrop={onChange}>
      {({ getRootProps, getInputProps }) => (
        <section className="media-form__field-image-section form__input">
          <div {...getRootProps()} className="media-form__dropzone">
            <input id={id} {...getInputProps()} />
            <div className="media-form__field-image" style={{ backgroundImage: `url(${src})` }} />
            <IconAdd className="media-form__field-image-icon" />
          </div>
        </section>
      )}
    </Dropzone>
  </div>
)

const MediaImage = (props) => {
  const { 
    id,
    field,
    label,
    nodeType,
    BASE_URL,
    authorization,
    fileUuid,
    onChange
  } = props 

  const [media, setMedia] = useState(null)
  const [localPreview, setLocalPreview] = useState(null)
  const [remoteMedia, setRemoteMedia] = useState(null)
  const [fileChanged, setFileChanged] = useState(false)
  const [done, setDone] = useState(true)
  const [failed, setFailed] = useState(false)

  if (window.location.host.includes('localhost')) {
    GlobalClient.authorization = `Basic ${btoa(authorization)}`
  } else {
    GlobalClient.sendCookies = true
  }
  
  GlobalClient.transport = window.fetch.bind(window)
  GlobalClient.baseUrl = BASE_URL

  useEffect(() => {
    (async () => {
      if (fileUuid && !remoteMedia && !localPreview) {
        const file = await Entity.Load('file', 'file', fileUuid)
        setRemoteMedia(file)
      }
    })()
  })

  const onSubmit = async (event, field, imageUpload) => {
    event.preventDefault();
    setDone(false)
    
    try {
      const drupalResponse = await FileEntity.Upload(imageUpload, imageUpload.name, "node", nodeType, field)
      onChange(drupalResponse.entityUuid)
      setDone(true)
      setFileChanged(true)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setFileChanged(false)
    } catch(error) {
      console.log(error)
      setDone(true)
      setFailed(true)
    }
  }

  return (
    <React.Fragment>
      <MediaFormField
        label={label}
        id={id}
        src={(
          !!media
          ? `'data:${media.type};base64, ${localPreview}'`
          : `${BASE_URL}${idx(remoteMedia, _ => _.uri.url)}`
        )}
        onChange={async files => {
          const binary = await getBinaryContent(files[0])
          setLocalPreview(binaryToBase64(binary))
          setMedia(files[0])
          setRemoteMedia(null)
        }}
      />
      <div className="form__button-wrapper">
        {remoteMedia == null && done && !fileChanged && <input 
          className="form__button" 
          type="submit" 
          value="Upload"
          onClick={e => onSubmit(e, field, media)}
        />}
        {!done && !fileChanged && <p>Uploading...</p>}
        {done && fileChanged ? <div>Image Uploaded !</div> : ''}
        {failed ? 'Failed to upload image' : ''}
      </div>
    </React.Fragment>
  )
}

export default MediaImage