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
      <h1>media-image Demo</h1>
      <MediaImage
        id={''}
        field={''}
        label={''}
        nodeType={''}
        BASE_URL={''}
        authorization={''}
        fileUuid={''}
        onChange={this.onChange}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
