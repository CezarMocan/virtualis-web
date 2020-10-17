import React from 'react'
import { withMainContext } from '../context/MainContext'
import { faq } from '../content/faq'
import classnames from 'classnames'

class Main extends React.Component {
  render() {
    const { url, visible } = this.props
    const pcCls = classnames({
      "page-content": true,
      "invisible": !visible 
    })
    return (
      <>
      <div className="page-container">
        <div className={pcCls}>
          { faq.map(f => {
            return (
              <div className="content-section narrow bordered faq">
                <h1>{f.title}</h1>
                { f.content.map(p => <p className="large" dangerouslySetInnerHTML={{ __html: p}}></p>)}
              </div>  
            )
          })}
        </div>
      </div>
      <div style={{height: 1, width: 1}}></div>
      </>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)