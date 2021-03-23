import React from 'react'
import { withMainContext } from '../../context/MainContext'
import { watch } from '../../content/watch'
import WatchRecording from './WatchRecording'
import classnames from 'classnames'

class Main extends React.Component {
  state = {
    windowWidth: 0,
    windowHeight: 0
  }
  onWindowResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  }
  componentWillMount() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
    window.addEventListener('resize', this.onWindowResize)
  }
  render() {
    const { url, TwitchEmbedVideo, visible } = this.props
    const pcCls = classnames({
      "page-content": true,
      "invisible": !visible 
    })

    const { windowWidth } = this.state
    const streamWidth = windowWidth > 500 ? (0.7 * windowWidth) : (0.87 * windowWidth)
    return (
      <>
      <div className="page-container">
        <div className={pcCls}>
          <div className="content-section narrow">
            { watch.description.map(p => <p className="large centered">{p}</p>) }
          </div>
          <div className="watch-live-container">
            { TwitchEmbedVideo && <TwitchEmbedVideo
              autoplay
              // channel={watch.liveTwitchChannel}
              video="824223818"
              height={streamWidth * 9 / 16}
              muted={false}
              allowfullscreen={true}
              targetId="twitch-embed"
              width={streamWidth}
              theme="dark"
              layout="video"
            /> }
          </div>

          {/* <h1 className="centered">Schedule</h1> */}
          { (watch.futureSessions.length > 0) && <h1 className="centered">Schedule</h1> }
          {/* { (watch.futureSessions.length == 0) && <p className="large centered">There are no future tours scheduled at the moment.</p> } */}
          <div className="schedule-container">
            { watch.futureSessions.map(s => {
              return (
                <WatchRecording
                  date={s.date}
                  time={s.time}
                  hasRecording={s.hasRecording}
                  twitchVideoId={s.twitchVideoId}
                  windowWidth={windowWidth}
                  isPast={false}
                />
              )
            })}
          </div>

          { (watch.pastSessions.length > 0) && <h1 className="centered">Watch Our Past Tours</h1> }
          { (watch.pastSessions.length == 0) && <p className="large centered">Once tours are completed, their recordings will be posted below.</p> }
          <div className="schedule-container">
            { watch.pastSessions.map((s, index) => {
              return (
                <WatchRecording
                  date={s.date}
                  time={s.time}
                  hasRecording={s.hasRecording}
                  twitchVideoId={s.twitchVideoId}
                  windowWidth={windowWidth}
                  uid={index}
                  isPast={true}
                />
              )
            })}
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
  router: context.router,
  TwitchEmbedVideo: context.TwitchEmbedVideo,
}))(Main)