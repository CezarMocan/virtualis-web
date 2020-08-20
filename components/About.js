import React from 'react'
import { withMainContext } from '../context/MainContext'
import ShallowLink from './ShallowLink'
import Logo from './Logo'
import MattImage from '../static/img/matt-image.png'
import MattAvatar from '../static/img/matt-avatar.png'
import LydiaImage from '../static/img/lydia-image.png'
import LydiaAvatar from '../static/img/lydia-avatar.png'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    console.log('LI', LydiaImage)
    return (
      <div className="page-container">
        <Logo className="small-logo"/>

        <div className="page-content">
          <div className="content-section narrow">
            <p className="large centered">
              The #1 VRChat Tour Agency!
            </p>

            <p className="large centered">
              Virtualis is a creative experiment in art, research, and performance. Using the social VR platform VRChat, Matt and Lydia have created a conceptual tourist agency as a way to engage audiences with their research and fascinations with social VR. While being playful, performative, and fun, their tours are also critical examinations of the culture making, body confusions, and social norms specific to VRChat and prevalent in social VR as a medium. 
            </p>

            <p className="large centered">
              Virtualis is the manifestion of the belief that media theory and deep thinking around the future of our digital spaces and counterparts can be explored and discussed outside of research papers and academic instituitions. Book a tour today and join us in exploring and questioning what social VR can teach us about the world today."
            </p>

          </div>

          <div className="team-container">
            <h1 className="centered">Meet Your Tour Guides</h1>

            <div className="team-grid">
              <div className="team-grid-item">

                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={LydiaImage}/>
                    <img className="team-member-image avatar" src={LydiaAvatar}/>
                  </div>
                </div>

                <h3 className="centered">Lydia Jessup</h3>

                <p className="small">Matt Romein is an artist and performer whose work consists of live performance, generative computer art, and multi-media installation. His practice explores the ways in which the physical body is recreated and represented in digital spaces and how the digital body can be manipulated in evocative and unsettling ways that challenges ideas of identity, autonomy, and ethics. </p>
                <p className="small">His work has been shown at BAM, Mana Contemporary, Soho Rep, The Public Theater, 3LD Art + Technology Center, and more. His art installation work has been shown at Sundance’s New Frontier Program, IDFA’s Doclab, and SXSW. He has had artist residencies and received grants from Pioneer Works, Google, CultureHub, Signal Culture, NYU, and more. He is currently a faculty member at ITP/IMA NYU in Brooklyn NY.</p>
                <p className="small"><a href="https://www.lydiajessup.me/" target="_blank">https://www.lydiajessup.me/</a></p>
              </div>
              
              <div className="team-grid-item">
                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={MattImage}/>
                    <img className="team-member-image avatar" src={MattAvatar}/>
                  </div>
                </div>

                <h3 className="centered">Matt Romein</h3>

                <p className="small">Matt Romein is an artist and performer whose work consists of live performance, generative computer art, and multi-media installation. His practice explores the ways in which the physical body is recreated and represented in digital spaces and how the digital body can be manipulated in evocative and unsettling ways that challenges ideas of identity, autonomy, and ethics. </p>
                <p className="small">His work has been shown at BAM, Mana Contemporary, Soho Rep, The Public Theater, 3LD Art + Technology Center, and more. His art installation work has been shown at Sundance’s New Frontier Program, IDFA’s Doclab, and SXSW. He has had artist residencies and received grants from Pioneer Works, Google, CultureHub, Signal Culture, NYU, and more. He is currently a faculty member at ITP/IMA NYU in Brooklyn NY.</p>
                <p className="small"><a href="https://matt-romein.com/" target="_blank">https://matt-romein.com/</a></p>                
              </div>
            </div>

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