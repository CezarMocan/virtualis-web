import React from 'react'
import Link from 'next/link'
import ShallowLink from './ShallowLink'
import { withMainContext } from '../context/MainContext'

class Main extends React.Component {
  state = {
    open: false
  }
  onMenuToggle = () => {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { url } = this.props
    const { open } = this.state
    return (
      <div className="menu-container">
        <div className="menu-button" onClick={this.onMenuToggle}><h3 className="noselect menu-link">Menu</h3></div>
        { open && 
        <div className="menu-options-container">
          {/* <ShallowLink href="/home"><div className="menu-button menu-list-button"><h3 className="noselect">Home</h3></div></ShallowLink> */}
          <ShallowLink href="/tours" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">Tour Packages</h3></div></ShallowLink>
          <ShallowLink href="/book" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">Book a Tour</h3></div></ShallowLink>
          {/* <ShallowLink href="/watch" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">Watch Now</h3></div></ShallowLink> */}
          <ShallowLink href="/about" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">About</h3></div></ShallowLink>
          <ShallowLink href="/faq" onClick={this.onMenuToggle}><div className="menu-button menu-list-button"><h3 className="noselect menu-link">FAQ</h3></div></ShallowLink>
        </div>
        }
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)