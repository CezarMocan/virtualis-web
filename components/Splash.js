import React from 'react'
import { withMainContext } from '../context/MainContext'
import Link from 'next/link'
import LogoSVG from '../static/img/virtualis_logo_1.svg'
import LogoPNG from '../static/img/virtualis_logo_1.png'
import Bubbles from './BubblesManager'

const TEXT_SPEED = 0.1

class Main extends React.Component {
  startOffset = 0

  onTextPathRef = (r) => {
    this._textPath = r    
  }
  onTextRef = (r) => {
    this._text = r
    // console.log(this._text.getBBox().width)
  }
  onPathRef = (r) => {
    this._path = r
    console.log(this._path.getTotalLength())
  }
  animate = () => {
    this.startOffset += TEXT_SPEED
    if (this._textPath) {
      this._textPath.setAttribute('startOffset', `${this.startOffset}%`)
    }
  }
  getDPath = () => {
    const padding = 30
    const w = window.innerWidth - 2 * padding
    const h = window.innerHeight - 2 * padding
    const d = `M${padding+20},${padding} h${w-50} a20,20 0 0 1 20,20 v${h-40} a20,20 0 0 1 -20,20 h-${w-40} a20,20 0 0 1 -20,-20 v-${h-40} a20,20 0 0 1 20,-20 `
    return d + d + 'z'
  }
  componentDidMount() {
    // setInterval(this.animate, 33)
    // this.animate()
    if (this._path) {
      this._path.setAttribute('d', this.getDPath())
    }
  }
  render() {
    const { url } = this.props
    return (
      <div className="page-container splash">
        <div className="splash-page-container">
          {/* <LogoSVG className="logo-image"/> */}
          <Bubbles/>
          <img className="splash-logo-image" src={LogoPNG}/>
          <svg style={{position: 'fixed', top: '0', left: '0', width: "100%", height: "100%"}}>
            <path ref={this.onPathRef} id="frame" fill="none" stroke="white" stroke-width="0" d="M100,100 h200 a20,20 0 0 1 20,20 v200 a20,20 0 0 1 -20,20 h-200 a20,20 0 0 1 -20,-20 v-200 a20,20 0 0 1 20,-20 M100,100 h200 a20,20 0 0 1 20,20 v200 a20,20 0 0 1 -20,20 h-200 a20,20 0 0 1 -20,-20 v-200 a20,20 0 0 1 20,-20 z" />
            <text ref={this.onTextRef} width="100%" style={{ transform: 'translate3d(0,0,0)', fill: 'white' }}>
              {/* <animate attributeType="XML" attributeName="x" from="0%" to="100%" dur="40s" repeatCount="indefinite"/> */}
              <textPath ref={this.onTextPathRef} startOffset='0%' style={{ transform: 'translate3d(0,0,0)' }} alignmentBaseline="top" href="#frame">
                <animate attributeType="XML" attributeName="startOffset" from="0%" to="50%" dur="250s" repeatCount="indefinite"/>
                The #1 VRChat Tour Agency 
                The #1 VRChat Tour Agency
                The #1 VRChat Tour Agency 
                The #1 VRChat Tour Agency
                The #1 VRChat Tour Agency 
                The #1 VRChat Tour Agency
                The #1 VRChat Tour Agency 
                The #1 VRChat Tour Agency
                The #1 VRChat Tour Agency 
                The #1 VRChat Tour Agency
                The #1 VRChat Tour Agency 
                The #1 VRChat Tour Agency
                The #1 VRChat Tour Agency 
                The #1 VRChat Tour Agency
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)