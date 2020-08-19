import React from 'react'
import Link from 'next/link'
import { withMainContext } from '../context/MainContext'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">
        <h1>Join portal</h1>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)