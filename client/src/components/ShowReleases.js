import React, { Component } from 'react'
import axios from 'axios'

class ShowReleases extends Component {
  state = {
    releases : []
  }

  componentDidMount () {
    axios.get('/api/showReleases/' + this.props.artistId).then((releases) => {
      this.setState({
        releases : releases.data.releases.filter((singleRelease) => singleRelease.type === "master")
      })
      console.log(this.state.releases)
    })
  }


  render ()
  {
    return (
      <div>
        {this.state.releases.length > 0 ? this.state.releases.map((release) => <div key={release.id}>{release.title}</div>) : "loading"}
      </div>
    )
  }
}

export default ShowReleases