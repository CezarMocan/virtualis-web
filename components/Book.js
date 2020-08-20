import React from 'react'
import { withMainContext } from '../context/MainContext'
import Logo from './Logo'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">        
        <Logo className="small-logo"/>

        <div className="page-content page-content-columns">
          <div className="page-column">
            <h2>How to Book a Tour</h2>

            <p>
              Virtualis is presented as a part of IDFA DocLab's 2020 festival. Residents of Amsterdam NL can schedule an appointment through the DocLab website to come to the festival. Attendees will be provided with an Oculus Rift VR headset and a docent who will make the sure the equipment is working correctly and that you are outfitted properly. From there our knowledgable VR Tour Guides™ will guide you through an onboarding process before beginning the tour.
            </p>

            <p>
              For those of you who are not residents of Amsterdam but have your own VR equipment we will have a select number of spots on each tour available for you. After registering we will send you details of what software you need as well as where and when to meet us.
            </p>
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