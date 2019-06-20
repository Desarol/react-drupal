import React from 'react'
import './styles.css'

const ImagePreview = (props) => {
  const { image, name, deleteImage } = props

  return(
    <div className="image-preview">
      <div className="image-preview__image-wrapper">
        {<img className="image-preview__image" src={image} />}
        <div>{name}</div>
      </div>
      <button onClick={deleteImage} className="image-preview__button">Remove</button>
    </div>
  )
}

export default ImagePreview;