import paper from 'paper'
import { random, easeOutElastic, easeOutCubic, valmap, clamp, sqDist } from '../modules/utils'

const HOVER_SCALE_TIME_S = 1
const SCALE_HOVERED = 1.5
const SCALE_REGULAR = 1

export default class Bubble {
  constructor(x, y, r, imageUrl) {
    this.r = r
    this.imageUrl = imageUrl

    this.raster = new paper.Raster()
    this.raster.opacity = 0
    this.raster.source = imageUrl
    this.raster.onLoad = this.onImageLoad

    this.circle = new paper.Path.Circle(new paper.Point(x, y), r)
    this.originalCircle = this.circle.clone()
    this.renderCircle = this.circle.clone()

    // this.circle.opacity = 0
    // this.renderCircle.strokeColor = 'blue'
    this.renderCircle.strokeWidth = 1
    // this.circle2 = new paper.Path.Circle(new paper.Point(30, 30), r / 2)
    // this.circle = this.circle.unite(this.circle2)
    this.clipCircle = this.circle.clone()//new paper.Path.Circle(this.circle)    

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
    this.circle.fillColor = this.fillColor
    this.circle.strokeColor = 'white'
    this.circle.strokeWidth = 1
    /*
    this.circle2.fillColor = this.fillColor
    this.circle2.strokeColor = 'white'
    this.circle2.strokeWidth = 0
    */

    this.shape = new paper.Group([this.clipCircle, this.raster, this.circle, this.renderCircle])
    this.shape.position = new paper.Point(0, 0)
    this.shape.clipped = true

    this.circle.onMouseEnter = this.onMouseEnter
    this.circle.onMouseLeave = this.onMouseLeave
    this.shape.onFrame = this.update

    // this.acceleration = new paper.Point(random(-0.1, 0.1), random(-0.3, -0.1))
    this.acceleration = new paper.Point(random(-0.3, 0.3), random(-0.5, -0.3))
    this.velocity = new paper.Point(0, 0)

    this.isMoving = true
    this.isDead = false

    this.isHovered = false
    this.startHoverTimestamp = 0
    this.stopHoverTimestamp = 0
    this.prevScale = this.currentScale = 1
    this.renders = true
    this.renderModeGroup = false

    this._group = [0]
  }
  onImageLoad = () => {
    this.raster.position = new paper.Point(this.circle.position.x, this.circle.position.y)
    this.raster.size = new paper.Size(3 * this.r, 3 * this.r)
    this.raster.opacity = 0
  }
  onMouseEnter = (e) => {
    if (!this.renders) return
    // this.shape.fillColor = 'red'
    this.isMoving = false
    this.isHovered = true
    this.startHoverTimestamp = performance.now()
  }
  onMouseLeave = (e) => {
    if (!this.renders) return
    this.isMoving = true
    this.isHovered = false
    this.stopHoverTimestamp = performance.now()
  }
  update = (e) => {
    // if (!this.renders) return
    if (this.isDead) return

    if (this.circle.position.y + 2 * this.r < 0) {
      this.isDead = true
      this.shape.onFrame = null
      this.circle.onMouseEnter = null
      this.circle.onMouseLeave = null
      return
    }

    if (this.isMoving) {
      // Move to new position
      this.velocity = this.velocity.add(this.acceleration)
      this.circle.position = this.circle.position.add(this.velocity)
      this.raster.position = this.raster.position.add(this.velocity)
      this.clipCircle.position = this.clipCircle.position.add(this.velocity)
      this.renderCircle.position = this.renderCircle.position.add(this.velocity)

      if (random(0, 1000) == 1) {
        this.acceleration = new paper.Point(random(-0.3, 0.3), random(-0.5, -0.3))
      } else {
        this.acceleration = new paper.Point(0, 0)
      }

      // Deal with mouseOut
      const currT = performance.now()
      if (currT - this.stopHoverTimestamp < 1000 * HOVER_SCALE_TIME_S) {
        const t = (currT - this.stopHoverTimestamp) / 1000.0
        const eT = easeOutElastic(t)
        const scale = valmap(eT, 0, 1, this.currentScale, SCALE_REGULAR)
        this.circle.scale(scale / this.prevScale)
        this.clipCircle.scale(scale / this.prevScale)
        this.prevScale = scale

        const eO = easeOutCubic(t)
        this.raster.opacity = 1 - clamp(eO, 0, 1)
      }
    } else {
      const currT = performance.now()
      if (currT - this.startHoverTimestamp < 1000 * HOVER_SCALE_TIME_S) {
        const t = (currT - this.startHoverTimestamp) / 1000.0
        const eT = easeOutElastic(t)
        const scale = valmap(eT, 0, 1, SCALE_REGULAR, SCALE_HOVERED)
        this.circle.scale(scale / this.prevScale)
        this.clipCircle.scale(scale / this.prevScale)
        this.prevScale = this.currentScale = scale

        const eO = easeOutCubic(t)
        this.raster.opacity = clamp(eO, 0, 1)
      }
    }

    // Update gradient
    /*
    if (this.shape.x && this.shape.y) {
      this.fillColor = {
        gradient: { stops: this.gradientStops },
        origin: new paper.Point(this.shape.x + this.r, this.shape.y + this.r / 4),
        destination: new paper.Point(this.shape.x - this.r, this.shape.y - this.r / 4)
      }
    }
    */
  }
  remove() {
    this.shape.remove()
  }
  getX() {
    return this.circle.position.x
  }
  getY() {
    return this.circle.position.y
  }
  getRadius() {
    return this.r
  }
  intersects(b) {
    let sqD = (this.getRadius() + b.getRadius()) * (this.getRadius() + b.getRadius())
    return (sqDist(this.getX(), this.getY(), b.getX(), b.getY()) <= sqD)
  }
  getCircle() {
    return this.circle
  }
  setGroup(g) {
    if (g.length == 1 && this._group.length > 1) {
      this.renderModeGroup = false
      if (this.renderCircle) {
        // this.renderCircle.remove()
        // delete this.renderCircle
      }
      /*
      let newCircle = this.originalCircle.clone()
      this.circle.replaceWith(newCircle)
      this.circle.remove()
      this.circle = newCircle
      this.circle.strokeWidth = 1
      this.circle.strokeColor = 'white'
      */

      /*
      let newClip = this.circle.clone()
      this.clipCircle.replaceWith(newClip)
      this.clipCircle = newClip
      */
    } else if (g.length > 1) {
      this.renderModeGroup = true
      if (this.renderCircle) this.renderCircle.remove()
      this.renderCircle = this.circle
      
      for (let i = 0; i < g.length; i++) {
        let c = g[i].getCircle()
        this.renderCircle = this.renderCircle.unite(c, { insert: false })
      }

      this.shape.addChild(this.renderCircle)
      this.renderCircle.fillColor = this.circle.fillColor
      this.renderCircle.strokeColor = this.circle.strokeColor
      this.renderCircle.strokeWidth = this.circle.strokeWidth
      this.shape.removeChildren(0)
      this.shape.insertChild(0, this.renderCircle)
    }
    this._group = g
  }
  setRenders(r) {
    this.renders = r
    if (!r) {
      this.shape.opacity = 0
    } else {
      this.shape.opacity = 1
    }
  }
}