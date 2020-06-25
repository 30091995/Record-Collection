import React, { Component } from 'react';
import './App.css';
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import Profile from './components/Profile'

import SearchField from "./components/searchField";

import { Route , } from 'react-router-dom'

class App extends Component {

  state = {
    loggedInUser : this.props.user
  }

    // user is not logged in already --> they are logging in using our React app
    updateUser = (newUser) => {
      this.setState({
        loggedInUser: newUser
      })
    }


    render () {
    return (
    <div className="App">
        <SearchField></SearchField>
        <Route exact path="/profile" render={() => <Profile user={this.state.loggedInUser} />} />
        <Route exact path="/signup" render={() => <Signup updateUser={this.updateUser}></Signup>} />
        <Route exact path="/login" render={() => <Login updateUser={this.updateUser}></Login>} />
    </div>
    );
    }
}

export default App;
