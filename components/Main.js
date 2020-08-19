import React from 'react'
import { withMainContext } from '../context/MainContext'
import Background from './Background'
import Menu from './Menu'
import Book from './Book'
import FAQ from './FAQ'
import Join from './Join'
import Tours from './Tours'
import About from './About'
import Splash from './Splash'

const NAV = {
  ABOUT: "about",
  BOOK: "book",
  FAQ: "faq",
  JOIN: "join",
  TOURS: "tours",
  HOME: ""  
}

class Main extends React.Component {
  render() {
    console.log(this.props)
    let { url } = this.props
    const lUrl = url.toLowerCase()

    let badUrl = (Object.values(NAV).indexOf(lUrl) == -1)
    return (
      <div className="app-container">
        <Menu/>
        <Background/>
        { lUrl == NAV.ABOUT && <About/>}
        { lUrl == NAV.BOOK && <Book/>}
        { lUrl == NAV.FAQ && <FAQ/>}
        { lUrl == NAV.JOIN && <Join/>}
        { lUrl == NAV.TOURS && <Tours/>}
        { (lUrl == NAV.HOME || badUrl) && <Splash/>}
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)