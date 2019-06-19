import React from 'react'

const ImagePreview = (props) => {
  const { image } = props

  return(
    <div>
      {<img src={image} />}
    </div>
  )
}

export default ImagePreview;