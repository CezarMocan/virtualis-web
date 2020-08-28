import React from 'react'
import { withMainContext } from '../context/MainContext'
import paper from 'paper'
import { random, computeConnectedComponents } from '../modules/utils'
import Bubble from './Bubble'
import Image1 from '../static/img/splash/1.png'
import Image2 from '../static/img/splash/2.png'
import Image3 from '../static/img/splash/3.png'
import Image4 from '../static/img/splash/4.png'
import Image5 from '../static/img/splash/5.png'
import Image6 from '../static/img/splash/6.png'
import Image7 from '../static/img/splash/7.png'
import Image8 from '../static/img/splash/8.png'

const IMAGES = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8]

const MAX_BUBBLES = 15
const INITIAL_BUBBLES = 10
const SPAWN_TIME_LOWER_BOUND_S = 1
const SPAWN_TIME_UPPER_BOUND_S = 3
const MAX_BUBBLE_RADIUS = 75
const MIN_BUBBLE_RADIUS = 20

class Main extends React.Component {
  graph = []
  bubbles = []
  nextSpawnTime = 0
  get width() { return window ? window.innerWidth : 100 }
  get height() { return window ? window.innerHeight : 100 }

  updateNextSpawnTime() {
    this.nextSpawnTime = performance.now() + 1000 * random(SPAWN_TIME_LOWER_BOUND_S, SPAWN_TIME_UPPER_BOUND_S)
  }
  spawnBubble(onScreen = false) {
    let x = random(0, this.width)
    let y = onScreen ? random(0, this.height) : random(this.height + 50, this.height + 250)
    let r = random(MIN_BUBBLE_RADIUS, MAX_BUBBLE_RADIUS)
    let index = parseInt(Math.floor(random(0, IMAGES.length)))
    return new Bubble(x, y, r, IMAGES[index])
  }
  spawnInitialBubbles() {
    for (let i = 0; i < INITIAL_BUBBLES; i++) {
      const b = this.spawnBubble(true)
      this.bubbles.push(b)
    }
    this.updateNextSpawnTime()
  }

  setupCanvas = (c) => {
    this._canvas = c
    paper.setup(this._canvas)
    paper.view.onFrame = this.draw
    paper.view.draw();
  }
  buildGraph() {
    this.graph = []
    for (let i = 0; i < this.bubbles.length; i++) this.graph.push([])

    for (let i = 0; i < this.bubbles.length; i++) {
      for (let j = i + 1; j < this.bubbles.length; j++) {
        if (this.bubbles[i].intersects(this.bubbles[j])) {
          this.graph[i].push(j)
          this.graph[j].push(i)
        }
      }
    }
  }

  draw = (evt) => {
    // Remove dead bubbles
    this.bubbles.forEach(b => { if (b.isDead) b.remove() })
    this.bubbles = this.bubbles.filter(b => !b.isDead)

    this.buildGraph()
    const cc = computeConnectedComponents(this.graph)

    for (let index = 0; index < cc.components.length; index++) {
      let comp = cc.components[index]
      let main = this.bubbles[comp[0]]
      let group = comp.map(i => this.bubbles[i])
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
      console.log(this.graph)
      console.log(cc)
    }
  }
  componentDidMount() {
    this.spawnInitialBubbles()
  }
  render() {
    return (
      <div className="splash-bubbles">
        <canvas id="bubble-canvas" resize="true" ref={this.setupCanvas}></canvas>
        <img id="bubbles-image-1" className="hidden" src={Image1}/>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)