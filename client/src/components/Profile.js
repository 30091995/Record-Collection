import React, { Component } from 'react'

class Profile extends Component {
  render () {
    return(
      <div>
        {this.props.user ? <h2>Hello {this.props.user.fullname}</h2> : ''}
      </div>
    )
  }
}

export default Profile