import React from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import ShallowLink from './ShallowLink'
import { withMainContext } from '../context/MainContext'
import IconWatch from '../static/img/livestream_icon_globe.png'
import IconMenu from '../static/img/mobile-menu-icon.png'
import IconClose from '../static/img/mobile-close-icon.png'
import Logo from './Logo'

const FADE_TRANSITION_DURATION = 500

class Main extends React.Component {
  state = {
    open: false,
    visible: false,
  }
  onMenuToggle = () => {
    if (this.state.open) {
      this.setState({ visible: false }, () => {
        setTimeout(() => {
          this.setState({ open: false })
        }, FADE_TRANSITION_DURATION)
      })  
    } else {
      this.setState({ open: true }, () => {
        setTimeout(() => {
          this.setState({ visible: true })
        }, 50)
        
      })
    }
  }
  render() {
    const { url, windowWidth } = this.props
    const { open, visible } = this.state
    const menuCls = classnames({
      'menu-options-container': true,
      'fading': true,
      'visible': visible
    })
    const mobileMenuCls = classnames({
      'mobile-menu-container': true,
      'fading': true,
      'visible': visible
    })
    const hasMobileMenu = (windowWidth <= 750)
    return (
      <>
        { hasMobileMenu &&
          <div className="mobile-menu-button-container" onClick={this.onMenuToggle}>
            <img src={IconMenu}/>
          </div>
        }
        { hasMobileMenu && open && 
            <div className={mobileMenuCls}>
              <Logo className="small-logo"/>
              <div className="fake-border">
                <ShallowLink href="/tours" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">Tour Packages</h3></div></ShallowLink>
                <ShallowLink href="/book" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">Book a Tour</h3></div></ShallowLink>
                <ShallowLink href="/watch" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">Watch</h3></div></ShallowLink>
                <ShallowLink href="/about" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">About</h3></div></ShallowLink>
                <ShallowLink href="/faq" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">FAQ</h3></div></ShallowLink>
              </div>
            </div>
        }
        { !hasMobileMenu && 
          <div className="menu-container">
            <div className="menu-button" onClick={this.onMenuToggle}><h3 className="noselect menu-link">Menu</h3></div>
            { open && 
              <div className={menuCls}>
                {/* <ShallowLink href="/home"><div className="menu-button menu-list-button"><h3 className="noselect">Home</h3></div></ShallowLink> */}
                <ShallowLink href="/tours" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">Tour Packages</h3></div></ShallowLink>
                <ShallowLink href="/book" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">Book a Tour</h3></div></ShallowLink>
                {/* <ShallowLink href="/watch" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">Watch Now</h3></div></ShallowLink> */}
                <ShallowLink href="/about" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">About</h3></div></ShallowLink>
                <ShallowLink href="/faq" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">FAQ</h3></div></ShallowLink>
              </div>
            }
          </div>
        }
        
          <ShallowLink href="/watch"><div className="menu-icon-watch"><img src={IconWatch}/></div></ShallowLink>        
      </>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router,
  windowWidth: context.windowWidth,
  windowHeight: context.windowHeight
}))(Main)