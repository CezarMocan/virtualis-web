import paper from 'paper'
import { random, easeOutElastic, valmap } from '../modules/utils'

const HOVER_SCALE_TIME_S = 1
const SCALE_HOVERED = 1.5
const SCALE_REGULAR = 1

export default class Bubble {
  constructor(x, y, r) {
    this.r = r
    this.shape = new paper.Path.Circle(new paper.Point(x, y), r)
    this.gradientStops = [
      [new paper.Color(1, 1, 1, 0.6), 0.06], 
      [new paper.Color(1, 1, 1, 0.4), 0.2], 
      [new paper.Color(1, 1, 1, 0.3), 0.3], 
      [new paper.Color(1, 1, 1, 0.1), 1]
    ]
    this.fillColor = {
      gradient: { stops: this.gradientStops },
      origin: new paper.Point(x + r, y + r / 4),
      destination: new paper.Point(x - r, y - r / 4)
    }
    this.shape.fillColor = this.fillColor
    this.shape.strokeColor = 'white'
    this.shape.strokeWidth = 1
    this.shape.onMouseEnter = this.onMouseEnter
    this.shape.onMouseLeave = this.onMouseLeave
    this.shape.onFrame = this.update

    this.acceleration = new paper.Point(random(-0.1, 0.1), random(-0.3, -0.1))
    this.velocity = new paper.Point(0, 0)

    this.isMoving = true
    this.isDead = false

    this.isHovered = false
    this.startHoverTimestamp = 0
    this.stopHoverTimestamp = 0
    this.prevScale = this.currentScale = 1
  }
  onMouseEnter = (e) => {
    // this.shape.fillColor = 'red'
    this.isMoving = false
    this.isHovered = true
    this.startHoverTimestamp = performance.now()
  }
  onMouseLeave = (e) => {
    this.shape.fillColor = this.fillColor
    this.isMoving = true
    this.isHovered = false
    this.stopHoverTimestamp = performance.now()
  }
  update = (e) => {
    if (this.isDead) return

    if (this.shape.position.x + 2 * this.r < 0) {
      this.isDead = true
    }

    if (this.isMoving) {
      // Move to new position
      this.velocity = this.velocity.add(this.acceleration)
      this.shape.position = this.shape.position.add(this.velocity)
      if (random(0, 1000) == 1) {
        this.acceleration = new paper.Point(random(-0.1, 0.1), random(-0.3, -0.1))
      } else {
        this.acceleration = new paper.Point(0, 0)
      }

      // Deal with mouseOut
      const currT = performance.now()
      if (currT - this.stopHoverTimestamp < 1000 * HOVER_SCALE_TIME_S) {
        const t = (currT - this.stopHoverTimestamp) / 1000.0
        const eT = easeOutElastic(t)
        const scale = valmap(eT, 0, 1, this.currentScale, SCALE_REGULAR)
        this.shape.scale(scale / this.prevScale)
        this.prevScale = scale
      }
    } else {
      const currT = performance.now()
      if (currT - this.startHoverTimestamp < 1000 * HOVER_SCALE_TIME_S) {
        const t = (currT - this.startHoverTimestamp) / 1000.0
        const eT = easeOutElastic(t)
        const scale = valmap(eT, 0, 1, SCALE_REGULAR, SCALE_HOVERED)
        this.shape.scale(scale / this.prevScale)
        this.prevScale = this.currentScale = scale
      }
    }

    // Update gradient
    if (this.shape.x && this.shape.y) {
      this.fillColor = {
        gradient: { stops: this.gradientStops },
        origin: new paper.Point(this.shape.x + this.r, this.shape.y + this.r / 4),
        destination: new paper.Point(this.shape.x - this.r, this.shape.y - this.r / 4)
      }
    }
  }
  remove() {
    this.shape.remove()
  }
}