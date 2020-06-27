import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import SearchField from './searchField'
import Logout from './Logout.js'

class Profile extends Component {
  render () {
    return(
      <div className="container">


        
        {this.props.user 
          ? <div>
              <h4>Hello {this.props.user.fullname}</h4> 
              <SearchField></SearchField>
              <Logout></Logout>
            </div> 
          : ''
        }

      </div>
    )
  }
}

export default Profile