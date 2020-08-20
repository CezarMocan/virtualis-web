import React from 'react'
import { withMainContext } from '../context/MainContext'
import Logo from './Logo'

class Main extends React.Component {
  render() {
    const { url } = this.props.url
    return (
      <div className="page-container">
        <Logo className="small-logo"/>

        <div className="page-content">
          <div className="content-section narrow bordered">
            <h1>How long does a tour take?</h1>
            <p className="large">
              Virtualis is a creative experiment in art, research, and performance. Using the social VR platform VRChat, Matt and Lydia have created a conceptual tourist agency as a way to engage audiences with their research and fascinations with social VR. While being playful, performative, and fun, their tours are also critical examinations of the culture making, body confusions, and social norms specific to VRChat and prevalent in social VR as a medium. 
            </p>
          </div>

          <div className="content-section narrow bordered">
            <h1>How long does a tour take?</h1>
            <p className="large">
              Virtualis is a creative experiment in art, research, and performance. Using the social VR platform VRChat, Matt and Lydia have created a conceptual tourist agency as a way to engage audiences with their research and fascinations with social VR. While being playful, performative, and fun, their tours are also critical examinations of the culture making, body confusions, and social norms specific to VRChat and prevalent in social VR as a medium. 
            </p>
          </div>

          <div className="content-section narrow bordered">
            <h1>How long does a tour take?</h1>
            <p className="large">
              Virtualis is a creative experiment in art, research, and performance. Using the social VR platform VRChat, Matt and Lydia have created a conceptual tourist agency as a way to engage audiences with their research and fascinations with social VR. While being playful, performative, and fun, their tours are also critical examinations of the culture making, body confusions, and social norms specific to VRChat and prevalent in social VR as a medium. 
            </p>
          </div>

          <div className="content-section narrow bordered">
            <h1>How long does a tour take?</h1>
            <p className="large">
              Virtualis is a creative experiment in art, research, and performance. Using the social VR platform VRChat, Matt and Lydia have created a conceptual tourist agency as a way to engage audiences with their research and fascinations with social VR. While being playful, performative, and fun, their tours are also critical examinations of the culture making, body confusions, and social norms specific to VRChat and prevalent in social VR as a medium. 
            </p>
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