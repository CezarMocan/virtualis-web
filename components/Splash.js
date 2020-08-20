import React from 'react'
import { withMainContext } from '../context/MainContext'
import Link from 'next/link'
import LogoSVG from '../static/img/virtualis_logo_1.svg'
import LogoPNG from '../static/img/virtualis_logo_1.png'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container splash">
        <div className="splash-page-container">
          {/* <LogoSVG className="logo-image"/> */}
          <img className="splash-logo-image" src={LogoPNG}/>
        </div>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)