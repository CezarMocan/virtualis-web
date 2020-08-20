import React from 'react'
import LogoPNG from '../static/img/virtualis_logo_1.png'
import ShallowLink from './ShallowLink'

class Logo extends React.Component {
  render() {
    return (
      <ShallowLink href="/home">
        <div className="small-logo-container">
          <img src={LogoPNG} {...this.props} />
        </div>
      </ShallowLink>
    )
  }
}

export default Logo