import React from 'react'
import ShallowLink from './ShallowLink'

class TourCard extends React.Component {
  render() {
    const { title, duration, about, image, schedule, eId } = this.props
    return (
      <div className="content-section bordered with-background"  id={eId}>
        <div className="tour-card-container">
          <div className="tour-card-column image">
            <img src={image}/>
          </div>
          <div className="tour-card-column text">
            <div className="text-column-content">
              <h1 style={{margin: '5px 0'}}>{title}</h1>
              <p className="small">{duration}</p>

              <div className="tour-card-column-content">
                <div className="tour-card-column-about margin-right">
                  <h5>About</h5>
                  <p className="small no-margin">{about}</p>
                </div>

                <div className="tour-card-column-schedule">
                  <h5>Schedule</h5>
                  { schedule.map(s => {
                    return (
                      <div className="schedule-item-container">
                        <p className="small no-margin">{s.date}</p>
                        <p className="small no-margin">{s.time}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="book-tour-container">
              <ShallowLink href="/book"><div className="menu-button small" style={{marginLeft: -5, marginTop: 5}}><h4 className="noselect">Book Tour</h4></div></ShallowLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TourCard.defaultProps = {
  image: '',
  title: '',
  duration: '',
  about: '',
  schedule: []
}

export default TourCard