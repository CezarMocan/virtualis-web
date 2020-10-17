import React from 'react'
import { withMainContext } from '../context/MainContext'
import Link from 'next/link'
import LogoSVG from '../static/img/virtualis_logo_1.svg'
import LogoPNG from '../static/img/virtualis_logo_hires.png'
import Bubbles from './BubblesManager'
import classnames from 'classnames'

class Main extends React.Component {
  render() {
    const { url, visible } = this.props
    const pcCls = classnames({
      "page-content": true,
      "splash": true,
      "invisible": !visible 
    })

    return (
      <div className="page-container splash">
        <div className={pcCls}>
          <div className="splash-page-container">
            {/* <LogoSVG className="logo-image"/> */}
            <Bubbles/>
            <img className="splash-logo-image" src={LogoPNG}/>
          </div>
        </div>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)