import React, { Component } from 'react';
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import Start from './components/Start.js'
import Profile from './components/Profile'
import ShowArtists from './components/ShowArtists.js'
import { Route , } from 'react-router-dom'
import NavigationBar from './components/NavigationBar.js';

class App extends Component {

  state = {
    loggedInUser: this.props.user
  }

    // user is not logged in yet --> they are logging in using our React app
    updateUser = (newUser) => {
      this.setState({
        loggedInUser: newUser
      })
    }

    render () {
    return (
    <div className="App">
    {this.state.loggedInUser ? <Route path="/" render={() => <NavigationBar updateUser={this.updateUser}></NavigationBar>} /> : null }
        <Route exact path="/" render={() => <Start user={this.state.loggedInUser}/>} />
        <Route exact path="/profile" render={() => <Profile user={this.state.loggedInUser} updateUser={this.updateUser}/>} />
        <Route exact path="/searchArtist" render={() => <ShowArtists user={this.state.loggedInUser} updateUser={this.updateUser}></ShowArtists>} />
        <Route exact path="/signup" render={() => <Signup updateUser={this.updateUser}></Signup>} />
        <Route exact path="/login" render={() => <Login updateUser={this.updateUser}></Login>} />
    </div>
    );
    }
}

export default App;
