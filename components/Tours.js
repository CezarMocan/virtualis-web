import React from 'react'
import { withMainContext } from '../context/MainContext'
import Logo from './Logo'
import TourCard from './TourCard'
import ImageTour1 from '../static/img/tours/1.png'
import ImageTour2 from '../static/img/tours/2.png'
import ImageTour3 from '../static/img/tours/3.png'

const tours = [
  {
    title: 'Dungeon Body Building Tour',
    duration: '15 minutes',
    about: 'Virtualis is a creative experiment in art, research, and performance. Using the social VR platform VRChat, Matt and Lydia have created a conceptual tourist agency as a way to engage audiences with their research and fascinations with social VR. While being playful, performative, and fun, their tours are also critical examinations of the culture making, body confusions, and social norms specific to VRChat and prevalent in social VR as a medium.',
    schedule: [
      { date: 'September 4, 2020', time: '4 – 4:15pm EST' },
      { date: 'September 2, 2020', time: '6 – 6:15pm EST' },
      { date: 'September 1, 2020', time: '4 – 4:15pm EST' },      
    ],
    image: ImageTour1
  },
  {
    title: 'Foxy Snow Angel Resort & Spa',
    duration: '30 minutes',
    about: 'Virtualis is a creative experiment in art, research, and performance. Using the social VR platform VRChat, Matt and Lydia have created a conceptual tourist agency as a way to engage audiences with their research and fascinations with social VR. While being playful, performative, and fun, their tours are also critical examinations of the culture making, body confusions, and social norms specific to VRChat and prevalent in social VR as a medium.',
    schedule: [
      { date: 'September 24, 2020', time: '4 – 4:15pm EST' },
      { date: 'September 21, 2020', time: '6 – 6:30pm EST' },
      { date: 'September 12, 2020', time: '4 – 4:30pm EST' },      
    ],
    image: ImageTour2
  },
  {
    title: 'Norm City Solo Subway Ride',
    duration: '1 hour',
    about: 'Virtualis is a creative experiment in art, research, and performance. Using the social VR platform VRChat, Matt and Lydia have created a conceptual tourist agency as a way to engage audiences with their research and fascinations with social VR. While being playful, performative, and fun, their tours are also critical examinations of the culture making, body confusions, and social norms specific to VRChat and prevalent in social VR as a medium.',
    schedule: [
      { date: 'October 4, 2020', time: '4 – 5pm EST' },
      { date: 'September 15, 2020', time: '6 – 7pm EST' },
      { date: 'September 12, 2020', time: '4 – 5pm EST' },      
    ],
    image: ImageTour3
  },  
]

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">
        <Logo className="small-logo"/>
        <div className="page-content">
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
          
        </div>
        
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)