import React from 'react'
import Link from 'next/link'
import { withMainContext } from '../context/MainContext'

class ShallowLink extends React.Component {
  onClick = () => {
    const { router, href, onClick } = this.props
    router.push(router.pathname, href, { shallow: true })
    if (onClick) onClick()
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