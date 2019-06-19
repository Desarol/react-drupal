import regeneratorRuntime from 'regenerator-runtime'

import React, {Component} from 'react'
import {render} from 'react-dom'

import MediaImage from '../../src/'

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
      <h1>media-image Demo</h1>
      <MediaImage
        id={'media_banner_image'}
        field={'field_opro_banner_image'}
        label={'Outfitter Banner Image'}
        nodeType={'opro'}
        BASE_URL={'http://live-cast-n-blast.pantheonsite.io'}
        authorization={'asdf_2:asdf'}
        fileUuid={'1a0b22e8-84d5-4034-8d00-c274f923c801'}
        onChange={this.onChange}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
