import React from 'react'
import { withMainContext } from '../context/MainContext'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">
        <h1>Tours</h1>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)