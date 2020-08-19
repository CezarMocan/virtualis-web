import React from 'react'
import Style from '../static/styles/main.less'
import { withPageRouter } from '../modules/withPageRouter'
import MainContextProvider from '../context/MainContext'
import Head from '../components/Head'
import Main from '../components/Main'

class Index extends React.Component {
  render() {
    return (
      <MainContextProvider url={this.props.router.asPath.split(/\//)[1]} router={this.props.router}>
        <Head/>
        <Main/>
      </MainContextProvider>
    )
  }
}

export default withPageRouter(Index)