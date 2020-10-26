import React from 'react'
import Style from '../static/styles/main.less'
import { withPageRouter } from '../modules/withPageRouter'
import MainContextProvider from '../context/MainContext'
import Head from '../components/Head'
import Main from '../components/Main'

class Index extends React.Component {
  render() {
    const fullUrl = this.props.router.asPath.split(/\//)[1]
    const hashArray = fullUrl.split('#')
    const url = hashArray.length > 0 ? hashArray[0] : ''
    const hash = hashArray.length > 1 ? hashArray[1] : ''
    return (
      <MainContextProvider url={url} hash={hash} router={this.props.router}>
        <Head/>
        <Main/>
      </MainContextProvider>
    )
  }
}

export default withPageRouter(Index)