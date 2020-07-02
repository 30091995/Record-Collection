import React, { Component } from "react";
import { Link } from "react-router-dom";

class Start extends Component {
  
  state = {
  };

  render() {
    return ( 
      this.props.user ? 
      <div>You are already logged in, why don't you check out your <Link to="/profile">Profile</Link>?</div>
     : 
      <div>
        <div className="display-1">STARTPAGE OF APP</div>
       <p><Link to="/signup">Signup</Link></p>
       <p><Link to="/login">Login</Link></p>
      </div>
      
    );
  }
}

export default Start;
