import React from 'react'
import { withMainContext } from '../../context/MainContext'
import paper, { Point, Size } from 'paper'
import { random, computeConnectedComponents, createAlignedText, updateAlignedText } from '../../modules/utils'
import Bubble from './Bubble'
import Image1 from '../../static/img/splash/1.png'
import Image2 from '../../static/img/splash/2.png'
import Image3 from '../../static/img/splash/3.png'
import Image4 from '../../static/img/splash/4.png'
import Image5 from '../../static/img/splash/5.png'
import Image6 from '../../static/img/splash/6.png'
import Image7 from '../../static/img/splash/7.png'
import Image8 from '../../static/img/splash/8.png'
import Image9 from '../../static/img/splash/9.png'
import Image10 from '../../static/img/splash/10.png'
import Image11 from '../../static/img/splash/11.png'
import Image12 from '../../static/img/splash/12.png'
import Image13 from '../../static/img/splash/13.png'
import Image14 from '../../static/img/splash/14.png'
import Image15 from '../../static/img/splash/15.png'
import Image16 from '../../static/img/splash/16.png'
import Image17 from '../../static/img/splash/17.png'
import Image18 from '../../static/img/splash/18.png'
import Image19 from '../../static/img/splash/19.png'
import Image20 from '../../static/img/splash/20.png'
import Image21 from '../../static/img/splash/21.png'
import Image22 from '../../static/img/splash/22.png'
import Image23 from '../../static/img/splash/23.png'
import Image24 from '../../static/img/splash/24.png'


const IMAGES = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10, Image11, Image12, Image13, Image14, Image15, Image16, Image17, Image18, Image19, Image20, Image21, Image22, Image23, Image24]

const TEXT_REPETITION = 100
const MAX_BUBBLES = 10
const INITIAL_BUBBLES = 8
const SPAWN_TIME_LOWER_BOUND_S = 1
const SPAWN_TIME_UPPER_BOUND_S = 3
const MAX_BUBBLE_RADIUS = 0.1
const MIN_BUBBLE_RADIUS = 0.03

const TEXT_SPEED = 0.3

let B_ID = 0

class Main extends React.Component {
  lastResizeTimerId = null
  graph = []
  bubbles = []
  nextSpawnTime = 0
  get width() { return window ? window.innerWidth : 100 }
  get height() { return window ? window.innerHeight : 100 }

  // **** BUBBLE INITIALIZATION **** \\
  updateNextSpawnTime() {
    this.nextSpawnTime = performance.now() + 1000 * random(SPAWN_TIME_LOWER_BOUND_S, SPAWN_TIME_UPPER_BOUND_S)
  }
  spawnBubble(onScreen = false) {
    let x = random(0, this.width)
    const minRadius = (MIN_BUBBLE_RADIUS) * ((this.height > this.width) + 1)
    const maxRadius = (MAX_BUBBLE_RADIUS) * ((this.height > this.width) + 1)
    let r = random(minRadius * this.width, maxRadius * this.width)
    let y = onScreen ? random(0, this.height) : random(this.height + r, this.height + 2 * r)
    let index = parseInt(Math.floor(random(0, IMAGES.length)))
    const isMobile = this.props.isMobile
    const b = new Bubble(x, y, r, IMAGES[index], isMobile)
    b.setMobileTapCallback(this.onBubbleMobileTap)
    return b
  }
  spawnInitialBubbles() {
    for (let i = 0; i < INITIAL_BUBBLES; i++) {
      const b = this.spawnBubble(true)
      this.bubbles.push(b)
    }
    this.updateNextSpawnTime()
  }  
  // **** **** \\


  // **** ROTATING TEXT FRAME INITIALIZATION **** \\
  initializeText = () => {
    const { isFirefox } = this.props
    this.textInitialized = false
    const padding = this.width > 500 ? 27 : 15
    const rect = new paper.Rectangle(new Point(padding, padding), new paper.Size(this.width - 2 * padding, this.height - 2 * padding))
    const cornerSize = new paper.Size(25, 25);
    this._frame = new paper.Path.Rectangle(rect, cornerSize)
    this.textOffset = 0
    const textRep = isFirefox ? 1 : TEXT_REPETITION
    this.textOnPath = createAlignedText("We are the #1 VRChat Tour Agency!", this._frame, { 
      fontSize: this.width > 500 ? 21 : 13, 
      fillColor: 'white',
      // fontWeight: 'bold',
      fontFamily: this.width > 500 ? 'Graphik-Bold' : 'Graphik-Bold'
    }, textRep)
    this.textInitialized = true
  }
  // **** **** \\

  onBubbleMobileTap = (id) => {
    if (!this.props.isMobile) return
    this.bubbles.forEach(b => {
      if (b.id == id) return
      if (b.isHovered) b.contract()
    })
  }

  // **** PER FRAME DRAWING **** \\
  buildGraph(bubbles) {
    this.graph = []
    for (let i = 0; i < bubbles.length; i++) this.graph.push([])
    for (let i = 0; i < bubbles.length; i++) {
      for (let j = i + 1; j < bubbles.length; j++) {
        if (bubbles[i].intersects(bubbles[j])) {
          this.graph[i].push(j)
          this.graph[j].push(i)
        }
      }
    }
    return this.graph
  }
  drawBubbles = (evt) => {
    // Remove dead bubbles
    this.bubbles.forEach(b => { if (b.isDead) b.remove() })
    this.bubbles = this.bubbles.filter(b => !b.isDead)
    this.bubbles = this.bubbles.sort((a, b) => {
      if (a.getX() + a.r > b.getX() + b.r) return -1
      return 1
    })

    let bubblesToProcess = this.bubbles.filter(b => !b.isHovered)

    const graph = this.buildGraph(bubblesToProcess)
    const cc = computeConnectedComponents(graph)

    for (let index = 0; index < cc.components.length; index++) {
      let comp = cc.components[index]
      let main = bubblesToProcess[comp[0]]
      let group = comp.map(i => bubblesToProcess[i])
      main.setRenders(true)
      main.setGroup(group)
      for (let i = 1; i < group.length; i++) {
        group[i].setRenders(false)
      }
    }

    // Spawn new bubbles
    if (performance.now() >= this.nextSpawnTime && this.bubbles.length <= MAX_BUBBLES) {
      const b = this.spawnBubble()
      this.bubbles.push(b)
      this.updateNextSpawnTime()
    }
  }
  drawText = () => {
    if (!this.textOnPath || !this.textInitialized) return
    this.textOffset += (TEXT_SPEED * this._frameTime / 16.0)
    updateAlignedText(this.textOnPath.glyphTexts, this.textOnPath.xOffsets, this._frame, this.textOffset, TEXT_SPEED)
  }
  draw = (evt) => {
    if (!this._frameCount) {
      this._frameCount = 0
      this._frameTime = 16
      this._frameTimestamp = performance.now()
    } else {
      this._frameCount++
      this._frameTime = this._frameTime * 0.9 + (performance.now() - this._frameTimestamp) * 0.1
      this._frameTimestamp = performance.now()  
    }
    this.drawText(evt)

    if (this._frameCount % 2 != 0) return
    this.drawBubbles(evt)
  }
  // **** **** \\

  // **** REACT LIFECYCLE, REFS & EVENT LISTENERS **** \\
  onWindowResize = () => {
    if (this.lastResizeTimerId != null) {
      clearTimeout(this.lastResizeTimerId)
      this.lastResizeTimerId = setTimeout(() => { this.initializeText(); this.lastResizeTimerId = null; }, 500)
    } else {
      if (this.textOnPath && this.textOnPath.glyphTexts) {
        this.textOnPath.glyphTexts.forEach(g => g.remove())
        this._frame.remove()
        delete this.textOnPath
        this.lastResizeTimerId = setTimeout(() => { this.initializeText(); this.lastResizeTimerId = null; }, 500)
      }  
    }
  }  
  setupCanvas = (c) => {
    this._canvas = c
  }
  componentDidMount() {
    if (paper.projects.length > 0) paper.projects.forEach(p => p.remove())
    paper.setup(this._canvas)
    paper.view.onFrame = this.draw
    paper.view.draw();
    this.spawnInitialBubbles()
    this.initializeText()
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }
  // ****  **** \\

  render() {
    return (
      <div className="splash-bubbles">
        <canvas id="bubble-canvas" resize="true" ref={this.setupCanvas}></canvas>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router,
  isMobile: context.isMobile,
  isFirefox: context.isFirefox
}))(Main)