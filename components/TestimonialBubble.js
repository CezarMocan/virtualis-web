import paper from 'paper'
import { random, randomSgn } from '../modules/utils'

const MAX_VELOCITY = 0.4
const MIN_VELOCITY = 0.1

export default class TestimonialBubble {
  constructor(x, y, text, r, noCircles, canvasWidth, canvasHeight) {
    this.fontSize = Math.min(22, 22 * (canvasWidth / 800))
    console.log('Font size: ', this.fontSize, canvasWidth)
    this.text = new paper.PointText(new paper.Point(0, 0))
    this.text.content = text.quote
    this.text.fontSize = this.fontSize
    this.text.fillColor = 'white'
    this.text.fontFamily = 'Graphik-Bold'
    this.text.justification = "center"
    r = 0.5 * this.text.bounds.width + 20
    this.text.remove()

    x = random(2 * r + 10, canvasWidth - 2 * r - 10)

    this._x = x
    this._y = y
    this._startRadius = r

    this.circles = [new paper.Path.Circle(new paper.Point(x, y), r)]
    let radius = r
    let center = { x: x, y: y, weightSum: 1 }
    for (let i = 1; i < noCircles; i++) {
      radius *= 0.75
      const angleInterval = 0.1 + 0.25 * (i - 1)
      const angle = (Math.random() < 0.5) ? random(-angleInterval, angleInterval) : random(Math.PI - angleInterval, Math.PI + angleInterval)
      let currX = Math.cos(angle) * r + x + random(-radius / 6, radius / 6)
      let currY = Math.sin(angle) * r + y + random(-radius / 6, radius / 6)
      let cnt = 0
      while ((currX - radius < 0 || currY - radius < 0 || currX + radius > canvasWidth) && cnt < 10) {
        currX = Math.cos(angle) * r + x + random(-radius / 6, radius / 6)
        currY = Math.sin(angle) * r + y + random(-radius / 6, radius / 6)  
        cnt++
      }
      if (cnt < 10) {
        this.circles.push(new paper.Path.Circle(new paper.Point(currX, currY), radius))
        // if (i < 2) {
          center.x += (radius / r) * currX
          center.y += (radius / r) * currY
          center.weightSum += (radius / r)  
        // }
      }
    }

    center.x /= center.weightSum
    center.y /= center.weightSum
    // this.renderCircle = this.circle.clone()

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
    this.circles.forEach(c => {
      c.fillColor = this.fillColor
      c.strokeColor = 'white'
      c.strokeWidth = 1
      c.opacity = 0
    })

    this.renderCircle = this.circles[0]
      
    for (let i = 1; i < this.circles.length; i++) {
      let c = this.circles[i]
      this.renderCircle = this.renderCircle.unite(c, { insert: false })
    }

    this.renderCircle.fillColor = this.fillColor
    this.renderCircle.strokeColor = 'white'
    this.renderCircle.strokeWidth = 1
    this.renderCircle.opacity = 1

    // this.text = new paper.PointText(new paper.Point(this.renderCircle.position.x, this.renderCircle.position.y))
    center.x = x; center.y = y;
    this.text = new paper.PointText(new paper.Point(center.x, center.y))
    // this.text.position = this.renderCircle.position.clone()
    this.text.content = text.quote
    this.text.fontSize = this.fontSize
    this.text.fillColor = 'white'
    this.text.fontFamily = 'Graphik-Bold'
    this.text.justification = "center"
    this.text.position.y -= this.text.bounds.height * 0.4

    this.authorText = new paper.PointText(new paper.Point(center.x, center.y))
    this.authorText.content = text.author
    this.authorText.fontSize = this.fontSize * (15 / 22)
    this.authorText.fillColor = 'white'
    this.authorText.fontFamily = 'Graphik-Regular'
    this.authorText.justification = "center"
    this.authorText.position.y += this.text.bounds.height * 0.65


    this.shape = new paper.Group([])
    this.shape.position = new paper.Point(0, 0)
    this.shape.addChild(this.renderCircle)
    this.shape.addChild(this.text)
    this.shape.addChild(this.authorText)
    this.shape.onFrame = this.update

    this.velocity = { x: random(MIN_VELOCITY, MAX_VELOCITY) * randomSgn(), y: random(MIN_VELOCITY, MAX_VELOCITY) * randomSgn() }
    this.movementBounds = {
      x: 0, width: canvasWidth,
      y: Math.max(0, y - 1.7 * r), height: Math.min(2.8 * r, canvasHeight - y + 1.5 * r)
    }
  }

  get lowerBound() {
    return this.renderCircle.bounds.bottom
  }
  remove() {
    this.shape.remove()
    this.text.remove()
    this.authorText.remove()
    this.shape.onFrame = null
  }
  update = () => {
    let dangerZoneXC = 1, dangerZoneYC = 1
    let dzX = Math.min(Math.abs(this.movementBounds.x - this.renderCircle.bounds.x), Math.abs(this.renderCircle.bounds.x + this.renderCircle.bounds.width - this.movementBounds.x - this.movementBounds.width))    
    let dzY = Math.min(Math.abs(this.movementBounds.y - this.renderCircle.bounds.y), Math.abs(this.renderCircle.bounds.y + this.renderCircle.bounds.height - this.movementBounds.y - this.movementBounds.height))    
    if (dzX < 20) dangerZoneXC = Math.max(dzX / 20, 0.25)
    if (dzY < 20) dangerZoneYC = Math.max(dzY / 20, 0.25)

    this.renderCircle.position.x += this.velocity.x * dangerZoneXC
    this.renderCircle.position.y += this.velocity.y * dangerZoneYC
    this.text.position.x += this.velocity.x * dangerZoneXC
    this.text.position.y += this.velocity.y * dangerZoneYC
    this.authorText.position.x += this.velocity.x * dangerZoneXC
    this.authorText.position.y += this.velocity.y * dangerZoneYC

    if (this.renderCircle.bounds.x <= this.movementBounds.x) {
      this.velocity.x = -this.velocity.x
    } else if (this.renderCircle.bounds.x + this.renderCircle.bounds.width >= this.movementBounds.x + this.movementBounds.width) {
      this.velocity.x = -this.velocity.x
    }

    if (this.renderCircle.bounds.y <= this.movementBounds.y) {
      this.velocity.y = -this.velocity.y
    } else if (this.renderCircle.bounds.y + this.renderCircle.bounds.height >= this.movementBounds.y + this.movementBounds.height) {
      this.velocity.y = -this.velocity.y
    }

    // this.text.position.add(new paper.Point(this.velocity.x, this.velocity.y))
    // this.authorText.position.add(new paper.Point(this.velocity.x, this.velocity.y))
  }
}