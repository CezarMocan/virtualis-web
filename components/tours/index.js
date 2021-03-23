import React from 'react'
import { withMainContext } from '../../context/MainContext'
import classnames from 'classnames'
import TourCard from './TourCard'
import TourCardSmall from './TourCardSmall'
import { tours, comingSoonTours } from '../../content/tourPackages'


class Main extends React.Component {
  componentDidMount() {
    const { hash } = this.props
    if (hash === '' || hash === null || hash === undefined) return
    const el = document.getElementById(hash)
    if (!el) return
    el.scrollIntoView()
  }
  render() {
    const { url, visible } = this.props
    const pcCls = classnames({
      "page-content": true,
      "wide": true,
      "invisible": !visible 
    })
    return (
      <>
      <div className="page-container">
        <div className={pcCls}>
          { tours.map(t => {
            return (
            <TourCard 
              title={t.title} 
              about={t.about} 
              duration={t.duration}
              schedule={t.schedule}
              image={t.image}
              eId={t.id}
              key={`tour-card-${t.id}`}
           />)
          })}
                
          { comingSoonTours.map(row => {
            return (
              <div className="coming-soon-tours-container">
                { row.map(t => {
                  return (
                    <TourCardSmall
                      title={t.title} 
                      about={t.about} 
                      duration={t.duration}
                      image={t.image}
                    />
                  )
                })

                }
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