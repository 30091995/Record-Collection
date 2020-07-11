import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom' 

class AddRecordFromScan extends Component {

  state = {
    saved : false
  }

    saveRecord = () => {
    const artist = this.props.singleRelease.title.split(" - ")[0]
    const title = this.props.singleRelease.title.split(" - ")[1]
    const imgUrl = this.props.singleRelease.thumb
    const userId = this.props.user._id
    const recordMainRelease = this.props.singleRelease.id
    console.log(recordMainRelease)
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
      <Link to={"/showRelease/" + this.props.singleRelease.id}>{this.props.singleRelease.title}</Link>
      <button onClick={this.saveRecord}>Add to your collection</button>
       </div>
     )
   }
}

export default AddRecordFromScan