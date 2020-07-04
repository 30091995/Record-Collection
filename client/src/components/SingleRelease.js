import React, { Component } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'

class SingleRelease extends Component
{

  state = {
    release : null
  }


  componentDidMount()
  {
    axios.get('/api/showSingleRelease/' + this.props.releaseNumber)
    .then((release) => {
      this.setState({
        release: release.data
      })
      console.log(this.state.release)
    })
  }




  render ()
  {
  return(
    <div>
      {this.state.release ? <h2> {this.state.release.title} </h2> : "Loading"}
      <h3>Tracks :</h3>
      {this.state.release && this.state.release.videos.map((video , index) => <div><ReactPlayer url={video.uri} /><br /></div>) }
    </div>
  )
  }
}

export default SingleRelease