import React from 'react'

/**
 * Pass images:
 * 
 * images = [{
 *    url: '',
 *    name: '',
 *    id: ''
 * }]
 */

const DrupalImagePreview = ({
  url,
  fileName,
  removeText = 'Remove',
  onDelete
}) => (
  <div className="drupal-image__preview">
    <img className="drupal-image__preview-image" src={url} />
    <div className="drupal-image__preview-filename">{fileName}</div>
    <button
      className="drupal-image__preview-button"
      onClick={onDelete}>{removeText}</button>
  </div>
)

const DrupalImage = ({
  images = [],
  limit = 1,
  accept = 'image/*',
  onUpload = () => {},
  onDelete = () => {},
}) => (
  <div className="drupal-image">
    {images && images.length > 0 && (
      <div className="drupal-image__preview-wrapper">
        {images.map(image => (
          <DrupalImagePreview 
            key={image.name + image.url}
            fileName={image.name}
            url={image.url}
            onDelete={() => onDelete(image.id)} />
          )
        )}
      </div>
    )}
    {images.length < limit && (
      <div className="drupal-image__input-wrapper">
        <input
          class="drupal-image__input"
          name="drupal-image"
          accept={accept}
          type="file"
          onChange={async event => {
            event.persist()
            onUpload(event.target.files[0])
            if (event.target) event.target.value = null
          }}
        />
      </div>
    )}
  </div>
)

export default DrupalImage