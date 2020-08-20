import React from 'react'
import ShallowLink from './ShallowLink'

class TourCardSmall extends React.Component {
  render() {
    const { title, duration, about, image } = this.props
    return (
      <div className="coming-soon-tour-container">
        <div className="content-section bordered with-background">
          <div className="small-tour-card-container">
            <div className="small-tour-card-column image">
              <img src={image}/>
            </div>
            <div className="small-tour-card-column text">
              <h3 style={{margin: '5px 0'}}>{title}</h3>
              <p className="small">{duration}</p>

              <div className="tour-card-column-content">
                <div className="tour-card-column-about">
                  <p className="small no-margin">{about}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TourCardSmall.defaultProps = {
  image: '',
  title: '',
  duration: '',
  about: '',
  schedule: []
}

export default TourCardSmall