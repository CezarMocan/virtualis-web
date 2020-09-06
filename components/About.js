import React from 'react'
import { withMainContext } from '../context/MainContext'
import ShallowLink from './ShallowLink'
import Logo from './Logo'
import MattImage from '../static/img/matt-image.png'
import MattAvatar from '../static/img/matt-avatar.png'
import LydiaImage from '../static/img/lydia-image.png'
import LydiaAvatar from '../static/img/lydia-avatar.png'
import { about } from '../content/about'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">
        <Logo className="small-logo"/>

        <div className="page-content">
          <div className="content-section narrow">
            { about.description.map(p => <p className="large centered">{p}</p>) }
          </div>

          <div className="team-container">
            <h1 className="centered">Meet Your Tour Guides</h1>

            <div className="team-grid">
              <div className="team-grid-item">

                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={about.lydia.image}/>
                    <img className="team-member-image avatar" src={about.lydia.avatar}/>
                  </div>
                </div>

                <h3 className="centered">{about.lydia.name}</h3>
                { about.lydia.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.lydia.website} target="_blank">{about.lydia.website}</a></p>
              </div>
              
              <div className="team-grid-item">
                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={about.matt.image}/>
                    <img className="team-member-image avatar" src={about.matt.avatar}/>
                  </div>
                </div>

                <h3 className="centered">{about.matt.name}</h3>
                { about.matt.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.matt.website} target="_blank">{about.matt.website}</a></p>

              </div>
            </div>

            <h3 className="centered">Meet the Team</h3>
            <div className="team-grid no-margin-bottom">
              <div className="team-grid-item small-margin">
                <h4>{about.emily.name}</h4>
                { about.emily.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.emily.website} target="_blank">{about.emily.website}</a></p>
              </div>

              <div className="team-grid-item small-margin">
                <h4>{about.james.name}</h4>
                { about.james.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.james.website} target="_blank">{about.james.website}</a></p>
              </div>

              <div className="team-grid-item small-margin">
                <h4>{about.cezar.name}</h4>
                { about.cezar.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.cezar.website} target="_blank">{about.cezar.website}</a></p>
              </div>
            </div>
          </div>

          <h3 className="centered">Contact Us</h3>
            <div className="team-grid no-margin-bottom">
              <div className="team-grid-item no-side-margin center-content">
                <a href={"tel:" + about.contact.tel}>  
                  <div className="contact-item-container"><p className="large centered">{about.contact.tel}</p></div>
                </a>
              </div>
              <div className="team-grid-item no-side-margin center-content">
                <a href={"mailto:" + about.contact.email}>
                  <div className="contact-item-container"><p className="large centered">{about.contact.email}</p></div>
                </a>
              </div>
              <div className="team-grid-item no-side-margin center-content">
                <a href={"https://www.instagram.com/" + about.contact.instagram} target="_blank">
                  <div className="contact-item-container"><p className="large centered">@{about.contact.instagram}</p></div>
                </a>
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