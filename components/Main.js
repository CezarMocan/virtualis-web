import React from 'react'
import { withMainContext } from '../context/MainContext'
import Background from './Background'
import Menu from './Menu'
import Book from './Book'
import FAQ from './FAQ'
import Watch from './Watch'
import Tours from './Tours'
import About from './About'
import Splash from './Splash'
import Logo from './Logo'

const NAV = {
  ABOUT: "about",
  BOOK: "book",
  FAQ: "faq",
  WATCH: "watch",
  TOURS: "tours",
  HOME: ""  
}

class Main extends React.Component {
  state = {
    previousUrl: '',
    transitioning: false,
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const nextUrl = nextProps.url.toLowerCase()
    const { previousUrl } = this.state
    if (nextUrl != previousUrl) {
      this.setState({
        transitioning: true
      }, () => {
        setTimeout(() => {
          this.setState({ previousUrl: nextUrl.toLowerCase(), transitioning: false })
        }, 500)
      })
    }
  }
  render() {
    let { url } = this.props
    console.log(this.props)
    let { previousUrl, transitioning } = this.state
    const lUrl = url.toLowerCase()
    const badUrl = (Object.values(NAV).indexOf(lUrl) == -1)
    const isSplash = lUrl == NAV.HOME || badUrl
    return (
      <div className="app-container">
        <Background/>
        <Menu/>
        { (lUrl == NAV.ABOUT || (previousUrl == NAV.ABOUT && transitioning)) && <About visible={lUrl == NAV.ABOUT && !transitioning}/>}
        { (lUrl == NAV.BOOK || (previousUrl == NAV.BOOK && transitioning))  && <Book visible={lUrl == NAV.BOOK && !transitioning}/>}
        { (lUrl == NAV.FAQ || (previousUrl == NAV.FAQ && transitioning))  && <FAQ visible={lUrl == NAV.FAQ && !transitioning}/>}
        { (lUrl == NAV.WATCH || (previousUrl == NAV.WATCH && transitioning))  && <Watch visible={lUrl == NAV.WATCH && !transitioning}/>}
        { (lUrl == NAV.TOURS || (previousUrl == NAV.TOURS && transitioning))  && <Tours visible={lUrl == NAV.TOURS && !transitioning}/>}
        { (isSplash || (previousUrl == NAV.HOME && transitioning))  && <Splash visible={isSplash && !transitioning}/>}
        {/* { (lUrl == NAV.HOME || badUrl) && <Splash/>} */}
        <Logo className="small-logo" visible={!(lUrl == NAV.HOME || badUrl)}/>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)