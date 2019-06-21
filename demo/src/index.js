import 'regenerator-runtime/runtime'
import React, {Component} from 'react'
import {render} from 'react-dom'
import MediaImage from '../../src/MediaImage'

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
        id={'field_image'}
        limit={1}
        field={'field_image'}
        label={'Field Image'}
        entityType={'node'}
        entityBundle={'article'}
        baseURL={'https://example.pantheonsite.io'}
        authorization={'username:password'}
        fileUUIDs={this.state.fileUUIDs}
        onChange={this.onChange}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
