import React from 'react'
import { withMainContext } from '../../context/MainContext'
import { about } from '../../content/about'
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
        {/* <Logo className="small-logo"/> */}

        <div className={pcCls}>
          <div className="content-section narrow">
            { about.description.map(p => <p className="large">{p}</p>) }
          </div>

          <div className="team-container">
            <h1 className="centered">Meet Your Tour Guides</h1>

            <div className="team-grid">
              <div className="team-grid-item">

                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={about.lydia.avatar}/>
                    <img className="team-member-image avatar" src={about.lydia.image}/>
                  </div>
                </div>

                <h3 className="centered">{about.lydia.name}</h3>
                { about.lydia.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.lydia.website} target="_blank">{about.lydia.website}</a></p>
              </div>
              
              <div className="team-grid-item">
                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={about.matt.avatar}/>
                    <img className="team-member-image avatar" src={about.matt.image}/>
                  </div>
                </div>

                <h3 className="centered">{about.matt.name}</h3>
                { about.matt.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.matt.website} target="_blank">{about.matt.website}</a></p>

              </div>
            </div>
          </div>

          <div className="team-container">
          <h1 className="centered">Meet The Team</h1>

            <div className="team-grid no-margin-bottom">
              <div className="team-grid-item">
                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={about.emily.avatar}/>
                    <img className="team-member-image avatar" src={about.emily.image}/>
                  </div>
                </div>

                <h3 className="centered">{about.emily.name}</h3>
                <p className="small centered no-margin-top">{about.emily.role}</p>
                { about.emily.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.emily.website} target="_blank">{about.emily.website}</a></p>
              </div>
              <div className="team-grid-item">
                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={about.cezar.avatar}/>
                    <img className="team-member-image avatar" src={about.cezar.image}/>
                  </div>
                </div>

                <h3 className="centered">{about.cezar.name}</h3>
                <p className="small centered no-margin-top">{about.cezar.role}</p>
                { about.cezar.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.cezar.website} target="_blank">{about.cezar.website}</a></p>
              </div>
            </div>
            <div className="team-grid no-margin-bottom">
              <div className="team-grid-item">
                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={about.james.avatar}/>
                    <img className="team-member-image avatar" src={about.james.image}/>
                  </div>
                </div>

                <h3 className="centered">{about.james.name}</h3>
                <p className="small centered no-margin-top">{about.james.role}</p>
                { about.james.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.james.website} target="_blank">{about.james.website}</a></p>
              </div>
              <div className="team-grid-item">
                <div className="team-member-centered-image">
                  <div className="team-member-image-container">
                    <img className="team-member-image" src={about.james2.avatar}/>
                    <img className="team-member-image avatar" src={about.james2.image}/>
                  </div>
                </div>

                <h3 className="centered">{about.james2.name}</h3>
                <p className="small centered no-margin-top">{about.james2.role}</p>
                { about.james2.bio.map(p => <p className="small">{p}</p>) }
                <p className="small"><a href={about.james2.website} target="_blank">{about.james2.website}</a></p>
              </div>
            </div>


          </div>

          <h3 className="centered">Contact Us</h3>
            <div className="team-grid team-grid-contact no-margin-bottom">
              <div className="team-grid-item no-side-margin center-content">
                {/* <a href={"tel:" + about.contact.tel}>  
                  <div className="contact-item-container"><p className="large centered">{about.contact.tel}</p></div>
                </a> */}
              </div>
              <div className="team-grid-item no-side-margin center-content">
                <a href={"mailto:" + about.contact.email}>
                  <div className="contact-item-container"><p className="large centered">{about.contact.email}</p></div>
                </a>
              </div>
              <div className="team-grid-item no-side-margin center-content">
                {/* <a href={"https://www.instagram.com/" + about.contact.instagram} target="_blank">
                  <div className="contact-item-container"><p className="large centered">@{about.contact.instagram}</p></div>
                </a> */}
              </div>
            </div>


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