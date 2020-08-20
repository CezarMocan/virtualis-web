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
        <div className="menu-button" onClick={this.onMenuToggle}><h3 className="noselect">Menu</h3></div>
        { open && 
        <div className="menu-options-container">
          {/* <ShallowLink href="/home"><div className="menu-button menu-list-button"><h3 className="noselect">Home</h3></div></ShallowLink> */}
          <ShallowLink href="/tours"><div className="menu-button menu-list-button"><h3 className="noselect">Tour Packages</h3></div></ShallowLink>
          <ShallowLink href="/book"><div className="menu-button menu-list-button"><h3 className="noselect">Book a Tour</h3></div></ShallowLink>
          <ShallowLink href="/about"><div className="menu-button menu-list-button"><h3 className="noselect">About</h3></div></ShallowLink>
          {/* <ShallowLink href="/join"><div className="menu-button menu-list-button"><h3 className="noselect">Join Portal</h3></div></ShallowLink> */}
          <ShallowLink href="/faq"><div className="menu-button menu-list-button"><h3 className="noselect">FAQ</h3></div></ShallowLink>
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