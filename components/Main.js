import React from 'react'
import { withMainContext } from '../context/MainContext'

class Main extends React.Component {
  render() {
    return (
      <h1>Test</h1> 
    )
  }
}

export default withMainContext((context, props) => ({

}))(Main)