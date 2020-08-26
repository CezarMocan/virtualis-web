import React from 'react'
import { withMainContext } from '../context/MainContext'
import paper from 'paper'
import { random } from '../modules/utils'
import Bubble from './Bubble'

const MAX_BUBBLES = 25
const INITIAL_BUBBLES = 10
const SPAWN_TIME_LOWER_BOUND_S = 1
const SPAWN_TIME_UPPER_BOUND_S = 3
const MAX_BUBBLE_RADIUS = 75
const MIN_BUBBLE_RADIUS = 20

class Main extends React.Component {

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
    return new Bubble(x, y, r)
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
  draw = (evt) => {
    // Remove dead bubbles
    this.bubbles.forEach(b => { if (b.isDead) b.remove() })
    this.bubbles = this.bubbles.filter(b => !b.isDead)

    // Spawn new bubbles
    if (performance.now() >= this.nextSpawnTime) {
      this.spawnBubble()
      this.updateNextSpawnTime()
    }
  }
  componentDidMount() {
    this.spawnInitialBubbles()
  }
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
  router: context.router
}))(Main)