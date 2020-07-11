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
    const imgUrl = this.props.singleRelease.imgUrl
    const userId = this.props.user._id
    const recordMainRelease = this.props.singleRelease.recordMainRelease
    console.log(userId)
    axios.post('/api/records', { artist, title, imgUrl, userId , recordMainRelease}).then((response) => {
      if(response.data !== null)
      {
        this.setState({
          saved: response.data.saved
        })
      }
    })
  }

   render ()
   {
     return(
      <div>
        {this.state.saved ? this.state.saved : ""}
      <img src={this.props.singleRelease.imgUrl} />
      <br />
      <Link to={"/showRelease/" + this.props.singleRelease.recordMainRelease }>{this.props.singleRelease.title}</Link>
      <button onClick={this.saveRecord}>Add to your collection</button>
       </div>
     )
   }
}

export default AddRecord