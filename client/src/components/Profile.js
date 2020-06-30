import React, { Component } from 'react'
import SearchField from './searchField'
import Logout from './Logout.js'


class Profile extends Component {

  updateUser = () => {
    this.props.updateUser(null)
  }

  render () {
    return(
      <div>


        
        {this.props.user 
          ? <h4>Hello {this.props.user.fullname}</h4> 
          : ''
        }

              <SearchField></SearchField>
              <Logout logoutUser={this.updateUser}></Logout>
  

      </div>
    )
  }
}

export default Profile