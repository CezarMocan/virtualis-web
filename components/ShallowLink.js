import React from 'react'
import Link from 'next/link'
import { withMainContext } from '../context/MainContext'

class ShallowLink extends React.Component {
  onClick = () => {
    const { router, href } = this.props
    console.log(router.pathname, href)
    router.push(router.pathname, href, { shallow: true })
  }
  render() {
    const { children } = this.props
    return (
      <span onClick={this.onClick}>
        { children }
      </span>
    )
  }
}

ShallowLink.defaultProps = {
  href: ""
}

export default withMainContext((context, props) => ({
  router: context.router
}))(ShallowLink)