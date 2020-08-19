import React from 'react'
import { withMainContext } from '../context/MainContext'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="background-container">
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)