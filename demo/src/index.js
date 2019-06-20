import 'regenerator-runtime/runtime'
import React, {Component} from 'react'
import {render} from 'react-dom'
import MediaImage from '../../src/MediaImage'
import config from '../../config'

class Demo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileUUIDs: [
        '44e97ee6-8435-4a6e-9bad-37668b47cd43',
        '2aa30958-b0fe-4c8f-ae24-42b12419a85d'
      ]
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
        limit={2}
        field={config.field}
        label={config.label}
        nodeType={config.nodeType}
        baseURL={config.baseURL}
        authorization={config.authorization}
        fileUUIDs={this.state.fileUUIDs}
        onChange={this.onChange}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
