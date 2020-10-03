import React from 'react'
import { withMainContext } from '../context/MainContext'
import Logo from './Logo'
import TourCard from './TourCard'
import TourCardSmall from './TourCardSmall'
import { tours, comingSoonTours } from '../content/tourPackages'


class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <>
      <div className="page-container">
        <Logo className="small-logo"/>
        <div className="page-content wide">
          { tours.map(t => {
            return (
            <TourCard 
              title={t.title} 
              about={t.about} 
              duration={t.duration}
              schedule={t.schedule}
              image={t.image}
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