import React from 'react'
import { withMainContext } from '../context/MainContext'
import ShallowLink from './ShallowLink'
import Logo from './Logo'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">        
        <Logo className="small-logo"/>

        <div className="page-content page-content-columns">
          <div className="page-column">
            <div className="content-section">
              <h2>How to Book a Tour</h2>
              <p>
                Virtualis is presented as a part of IDFA DocLab's 2020 festival. Residents of Amsterdam NL can schedule an appointment through the DocLab website to come to the festival. Attendees will be provided with an Oculus Rift VR headset and a docent who will make the sure the equipment is working correctly and that you are outfitted properly. From there our knowledgable VR Tour Guides™ will guide you through an onboarding process before beginning the tour.
              </p>
              <p>
                For those of you who are not residents of Amsterdam but have your own VR equipment we will have a select number of spots on each tour available for you. After registering we will send you details of what software you need as well as where and when to meet us.
              </p>
            </div>

            <div className="content-section">
              <h2>Equipment Required</h2>
              <p>
                If you are attending in person through the festival there is no equipment need. Wear comfortable clothing and shoes. You will have the option to be seated or standing.
              </p>
              <p>
                Remote attendees will need either an Oculus Rift headset or a Vive headset as a VR capable computer. Oculus Quest users will need to use a Link cable and PC. If you have questions about whether your VR equipment is compatible you may send us a message. 
              </p>
              <p>
                While VRChat does have a non-VR desktop mode we will not be accomodating those users as we feel VR is an essential part of the experience and topics covered in our tours."
              </p>
            </div>

            <div className="content-section">
              <h2>Can't Make a Tour?</h2>
              <p>
                Make sure to catch one of our live streams on Twitch or check out an archived tour.
              </p>

              <ShallowLink href="/join"><div className="menu-button small" style={{marginLeft: -5, marginTop: 5}}><h4 className="noselect">Watch Now</h4></div></ShallowLink>

            </div>
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