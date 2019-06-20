import regeneratorRuntime from 'regenerator-runtime'
import React, {Component} from 'react'
import {render} from 'react-dom'
import MediaImage from '../../src/MediaImage'
import config from '../../config'

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
      fileUUIDs: uuid
    })
  }

  render() {
    console.log(this.state.fileUUIDs)
    return <div>
      <h1>Media Image Demo</h1>
      <MediaImage
        id={config.id}
        limit={1}
        field={config.field}
        label={config.label}
        nodeType={config.nodeType}
        baseURL={config.baseURL}
        authorization={config.authorization}
        fileUUID={this.state.fileUUIDs}
        onChange={this.onChange}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
