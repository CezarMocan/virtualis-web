import React from 'react'
import { withMainContext } from '../context/MainContext'
import ShallowLink from './ShallowLink'
import Logo from './Logo'
import { book } from '../content/book'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">        
        <Logo className="small-logo"/>

        <div className="page-content page-content-columns">
          <div className="page-column">
            { book.map(t => {
              return (
                <div className="content-section">
                  <h2>{t.title}</h2>
                  { t.content.map(p => <p>{p} </p>)}
                  { t.button && <ShallowLink href="/join"><div className="menu-button small" style={{marginLeft: -5, marginTop: 5}}><h4 className="noselect">Watch Now</h4></div></ShallowLink> }
                </div>    
              )
            })}
          </div>
          <div className="page-column">

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