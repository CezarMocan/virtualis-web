import React from 'react'
import Link from 'next/link'
import ShallowLink from './ShallowLink'
import { withMainContext } from '../context/MainContext'

class Main extends React.Component {
  onJoin = () => {
    this.props.router.push(this.props.router.pathname, `/join`, { shallow: true })
  }
  render() {
    const { url } = this.props.url
    return (
      <div className="menu-container">
        <ShallowLink href="/home"><a>Home</a></ShallowLink>        
        <ShallowLink href="/join"><a>Join Portal</a></ShallowLink>
        <ShallowLink href="/tours"><a>View Tours</a></ShallowLink>

        {/* <Link href="/" shallow={true}> <a>Home</a> </Link>
        <Link href="join" shallow={true}> <a>Join Portal</a> </Link>
        <Link href="tours" shallow={true}> <a>View Tours</a> </Link>
        <Link href="book" shallow={true}> <a>Book a tour</a> </Link> */}
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)