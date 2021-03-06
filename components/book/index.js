import React from 'react'
import paper from 'paper'
import { withMainContext } from '../../context/MainContext'
import ShallowLink from '../ShallowLink'
import { book, testimonials } from '../../content/book'
import TestimonialBubble from './TestimonialBubble'
import { random } from '../../modules/utils'
import classnames from 'classnames'

const MAX_BUBBLE_RADIUS = 0.25
const MIN_BUBBLE_RADIUS = 0.25

class Main extends React.Component {
  get width() { return this._canvas ? this._canvas.width / window.devicePixelRatio : 100 }
  get height() { return this._canvas ? this._canvas.height / window.devicePixelRatio : 100 }

  setupCanvas = (c) => {
    this._canvas = c
  }
  spawnBubble(index, prevY, text) {
    const r = this.width > 500 ? 0.25 * this.width : 0.38 * this.width
    let x = this.width / 2
    let y = prevY + 1.5 * r
    return new TestimonialBubble(x, y, text, r, Math.floor(random(5, 9)), this.width, this.height)
  }
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  componentDidMount() {
    if (paper.projects.length > 0) paper.projects.forEach(p => p.remove())
    paper.setup(this._canvas)
    paper.view.draw();
    let prevY = this.width > 500 ? -50 : -50
    this.shuffleArray(testimonials)
    for (let i = 0; i < testimonials.length; i++) {
      const b = this.spawnBubble(i, prevY, testimonials[i])
      prevY = b.lowerBound
      if (prevY > this.height) {
        b.remove()
        return
      }
    }
  }
  componentWillUnmount() {
  }
  render() {
    const { url, visible } = this.props
    const pcCls = classnames({
      "page-content": true,
      "page-content-columns": true,
      "invisible": !visible 
    })
    return (
      <>
      <div className="page-container">
        <div className={pcCls}>
          <div className="page-column">
            { book.map(t => {
              return (
                <div className="content-section">
                  <h2>{t.title}</h2>
                  { t.content.map(p => <p dangerouslySetInnerHTML={{ __html: p}}></p>)}
                  { t.button && <ShallowLink href="/watch"><div className="menu-button small" style={{marginLeft: -5, marginTop: 5}}><h4 className="noselect">Watch Now</h4></div></ShallowLink> }
                </div>    
              )
            })}
          </div>
          <div className="page-column">
            <canvas id="book-bubble-canvas" resize="true" ref={this.setupCanvas}></canvas>
          </div>
        </div>
      </div>
      <div style={{height: 1, width: 1}}></div>
      </>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)