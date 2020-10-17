import React from 'react'
import LogoPNG from '../static/img/virtualis_logo_1.png'
import ShallowLink from './ShallowLink'
import classnames from 'classnames'

class Logo extends React.Component {
  render() {
    const { visible } = this.props
    const cls = classnames({
      "small-logo-container": true,
      "invisible": !visible
    })
    return (
      <ShallowLink href="/home">
        <div className={cls}>
          <img src={LogoPNG} {...this.props} />
        </div>
      </ShallowLink>
    )
  }
}

export default Logo