import React from 'react'
import { withMainContext } from '../context/MainContext'
import Logo from './Logo'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">
        <Logo className="small-logo"/>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)