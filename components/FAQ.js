import React from 'react'
import { withMainContext } from '../context/MainContext'
import Logo from './Logo'
import { faq } from '../content/faq'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">
        <Logo className="small-logo"/>

        <div className="page-content">
          { faq.map(f => {
            return (
              <div className="content-section narrow bordered faq">
                <h1>{f.title}</h1>
                { f.content.map(p => <p className="large">{p}</p>)}
              </div>  
            )
          })}
        </div>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)