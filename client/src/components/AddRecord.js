import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom' 

class AddRecord extends Component {

  state = {
    saved : false
  }

    saveRecord = () => {
    const artist = this.props.singleRelease.artist
    const title = this.props.singleRelease.title
    const imgUrl = this.props.singleRelease.thumb
    const userId = this.props.user._id
    const recordMainRelease = this.props.singleRelease.main_release
    console.log(userId)
    axios.post('/api/records', { artist, title, imgUrl, userId , recordMainRelease}).then((response) => {
      if(response.data !== null)
      {
        this.setState({
          saved: true
        })
      }
    })
  }

   render ()
   {
     return(
      <div>
        {this.state.saved ? "Saved" : ""}
      <img src={this.props.singleRelease.thumb} />
      <br />
      <Link to={"/showRelease/" + this.props.singleRelease.main_release }>{this.props.singleRelease.title}</Link>
      <button onClick={this.saveRecord}>Add to your collection</button>
       </div>
     )
   }
}

export default AddRecord