import regeneratorRuntime from 'regenerator-runtime'

import React, {Component} from 'react'
import {render} from 'react-dom'

import MediaImage from '../../src/MediaImage'

class Demo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileUUIDs: []
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(uuid) {
    this.setState({
      fileUUIDs: [ ...this.state.fileUUIDs, uuid]
    })
  }

  render() {
    console.log(this.state.fileUUIDs)
    return <div>
      <h1>Media Image Demo</h1>
      <MediaImage
        id={'card_image'}
        field={'field_opro_card_image'}
        label={'Card Image'}
        nodeType={'opro'}
        BASE_URL={'http://live-cast-n-blast.pantheonsite.io'}
        authorization={'asdf_2:asdf'}
        fileUuid={null}
        onChange={this.onChange}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
