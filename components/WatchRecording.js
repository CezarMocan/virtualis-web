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
    const { date, time, hasRecording, twitchVideoId, windowWidth, uid, TwitchEmbedVideo, isPast } = this.props
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
    const optStyle = { height: open ? streamHeight + 150 : containerHeight }
    return (
      <div className={containerCls} onClick={this.onClick} style={hasRecording ? optStyle : {}}>
        <div className="date-time-container">
          <p className="large left-align" dangerouslySetInnerHTML={{ __html: date}}></p>
          { !hasRecording && <p className="large right-align" dangerouslySetInnerHTML={{ __html: time}}></p> }
          { hasRecording && open && <div className="minus"></div> }
          { hasRecording && !open && <div className="plus"></div> }
        </div>
        { hasRecording && TwitchEmbedVideo && <div className="twitch-video-container">
          <TwitchEmbedVideo
              video={twitchVideoId}
              height={streamHeight}
              muted={false}
              autoplay={false}
              allowfullscreen={true}
              targetId={`twitch-embed-${uid}`}
              width={streamWidth}
              theme="dark"
          />
        </div> }
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