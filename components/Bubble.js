import paper from 'paper'
import { random, easeOutElastic, easeOutCubic, valmap, clamp, sqDist } from '../modules/utils'

const HOVER_SCALE_TIME_S = 1
const SCALE_HOVERED = 1.5
const SCALE_REGULAR = 1
const RASTER_LOAD_SIZE = 1024

let UID = 0

export default class Bubble {
  constructor(x, y, r, imageUrl) {
    this.r = r
    this.id = UID++
    this.imageUrl = imageUrl

    this.raster = new paper.Raster()
    this.raster.opacity = 0
    this.raster.source = imageUrl
    this.raster.onLoad = this.onImageLoad
    this.rasterScale = 1
    this.rasterSize = RASTER_LOAD_SIZE

    this.circle = new paper.Path.Circle(new paper.Point(x, y), r)
    this.renderCircle = this.circle.clone()

    // this.circle.opacity = 0
    // this.renderCircle.strokeColor = 'blue'
    this.renderCircle.strokeWidth = 1
    // this.circle2 = new paper.Path.Circle(new paper.Point(30, 30), r / 2)
    // this.circle = this.circle.unite(this.circle2)
    this.clipCircle = this.circle.clone()//new paper.Path.Circle(this.circle)    

    this.gradientStops = [
      [new paper.Color(1, 1, 1, 0.4), 0.06], 
      [new paper.Color(1, 1, 1, 0.3), 0.2], 
      [new paper.Color(1, 1, 1, 0.25), 0.3], 
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

    // this.shape.strokeWidth = 1
    // this.shape.strokeColor = 'red'

    this.shape.onMouseEnter = this.onMouseEnter
    this.shape.onMouseLeave = this.onMouseLeave
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
    this.raster.size = new paper.Size(RASTER_LOAD_SIZE, RASTER_LOAD_SIZE)
    this.raster.position = new paper.Point(this.circle.position.x, this.circle.position.y)
    this.rasterScale = 3.5 * this.r / RASTER_LOAD_SIZE
    this.rasterSize = RASTER_LOAD_SIZE * this.rasterScale 
    this.raster.scale(this.rasterScale)
    this.raster.opacity = 0
  }
  onMouseEnter = (e) => {
    if (!this.renders) return
    this.isMoving = false
    this.isHovered = true
    this.startHoverTimestamp = performance.now()  

    if (this.renderModeGroup) {
      this._group.forEach(b => {
        b.isMoving = false
        b.isHovered = true
      })
    }
  }
  onMouseLeave = (e) => {
    if (!this.renders) return
    this.isMoving = true
    this.isHovered = false
    this.stopHoverTimestamp = performance.now()

    if (this.renderModeGroup) {
      this._group.forEach(b => {
        b.isMoving = true
        b.isHovered = false
      })
    }
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
        if (!this.renderModeGroup) {
          this.circle.scale(scale / this.prevScale)
        } else {
          this.renderCircle.scale(scale / this.prevScale)
        }
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
        if (!this.renderModeGroup) {
          this.circle.scale(scale / this.prevScale)
        } else {
          this.renderCircle.scale(scale / this.prevScale)
        }
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
      if (this.renderCircle.isInserted()) {
        this.renderCircle.remove()
        this.clipCircle = this.circle.clone({ insert: false })
        // this.shape.addChild(this.circle)
        this.shape.removeChildren(0, 1)
        this.shape.addChild(this.clipCircle)
        this.shape.addChild(this.raster)
        this.shape.addChild(this.circle)
        this.shape.clipped = true

        const newRasterScale = 3.5 * this.r / RASTER_LOAD_SIZE
        this.rasterSize = RASTER_LOAD_SIZE * this.newRasterScale 
        this.raster.scale(newRasterScale / this.rasterScale)
        this.raster.position = this.circle.position.clone()
        this.rasterScale = newRasterScale
      }
    } else if (g.length > 1) {
      if (this.isHovered) return
      this.renderModeGroup = true
      if (this.renderCircle) {
        this.renderCircle.remove()
        this.renderCircle.onMouseEnter = null
        this.renderCircle.onMouseLeave = null
      }
      this.renderCircle = this.circle.clone({ insert: false })
      // this.renderCircle.onMouseEnter = this.onMouseEnter
      // this.renderCircle.onMouseLeave = this.onMouseLeave
      
      for (let i = 1; i < g.length; i++) {
        let c = g[i].getCircle()
        this.renderCircle = this.renderCircle.unite(c, { insert: false })
      }

      this.clipCircle = this.renderCircle.clone({ insert: false })
      // this.shape.addChild(this.renderCircle)
      // rthis.circ
      this.renderCircle.fillColor = this.circle.fillColor
      this.renderCircle.strokeColor = this.circle.strokeColor
      this.renderCircle.strokeWidth = 1

      /*
      const newWidth = this.renderCircle.bounds.width / 8
      const newHeight = this.renderCircle.bounds.height / 8
      const newSize = Math.max(newWidth, newHeight)
      const newRasterScale = newSize / this.rasterSize
      this.rasterSize = newSize
      this.raster.scale(newRasterScale / this.rasterScale)
      this.rasterScale = newRasterScale
      // console.log(newWidth, newHeight)
      // this.raster.size = new paper.Size(newSize, newSize)
      this.raster.position.x = this.renderCircle.bounds.x + this.renderCircle.bounds.width / 2
      this.raster.position.y = this.renderCircle.bounds.y + this.renderCircle.bounds.height / 2
      */

      this.shape.removeChildren()
      this.shape.addChild(this.clipCircle)
      this.shape.addChild(this.raster)
      this.shape.addChild(this.renderCircle)      

      const bounds = this.renderCircle.bounds.clone()
      bounds.x -= bounds.width / 2
      bounds.y -= bounds.height / 2
      bounds.width += 1 * bounds.width
      bounds.height += 1 * bounds.height
      this.raster.fitBounds(bounds, true)

      this.shape.clipped = true
    }
    this._group = g
  }
  setRenders(r) {
    this.renders = r
    if (!r) {
      this.shape.opacity = 0
      this.shape.sendToBack()
    } else {
      this.shape.opacity = 1
    }
  }
}