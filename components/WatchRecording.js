import React from 'react'
import classnames from 'classnames'
import { withMainContext } from '../context/MainContext'

class WatchRecording extends React.Component {
  state = {
    open: false
  }
  onClick = () => {
    const { hasRecording } = this.props
    if (!hasRecording) return;
    this.setState({ open: !this.state.open })
  }
  render() {
    const { date, time, hasRecording, twitchVideoId, windowWidth, uid, TwitchEmbedVideo } = this.props
    const { open } = this.state
    const containerCls = classnames({
      "watch-recording-container": true,
      "interactive": hasRecording,
      "with-background": open,
      "open": open
    })
    const streamWidth = windowWidth * 0.83 - ((windowWidth > 500) ? 290 : 30)
    const streamHeight = streamWidth * 9 / 16
    const containerHeight = windowWidth > 1000 ? 80 : 55
    return (
      <div className={containerCls} onClick={this.onClick} style={{height: open ? streamHeight + 150 : containerHeight}}>
        <div className="date-time-container">
          <p className="large">{date}</p>
          <p className="large">{time}</p>
        </div>
        <div className="twitch-video-container">
          { hasRecording && TwitchEmbedVideo && <TwitchEmbedVideo
              video={twitchVideoId}
              height={streamHeight}
              muted={false}
              autoplay={false}
              allowfullscreen={true}
              targetId={`twitch-embed-${uid}`}
              width={streamWidth}
              theme="dark"
          /> }
        </div>
      </div>
    )
  }
}

WatchRecording.defaultProps = {
  date: '',
  time: '',
  hasRecording: false,
  twitchVideoId: null,
  windowWidth: 0,
  uid: 0
}

export default withMainContext((context, props) => ({
  TwitchEmbedVideo: context.TwitchEmbedVideo,
}))(WatchRecording)