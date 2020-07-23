import React, { Component } from 'react';
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import Start from './components/Start.js'
import Profile from './components/Profile'
import ShowArtists from './components/ShowArtists.js'
import { Route, Redirect , } from 'react-router-dom'
import ShowReleases from './components/ShowReleases.js'
import NavigationBar from './components/NavigationBar.js';
import ScanRecord from './components/ScanRecord.js';
import SingleRelease from './components/SingleRelease.js'

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

    protected = (comp) => {
      if (this.state.loggedInUser && this.state.loggedInUser.verifiedEmail) {
        return comp
      } else {
        return <Redirect to="/login"></Redirect>
      }
    }

    redirectExistingUser = (comp) => {
      if (!this.state.loggedInUser) {
        return comp
      } 
      else if (this.state.loggedInUser && !this.state.loggedInUser.verifiedEmail) {
        return comp
      }
      else {
        return <Redirect to="/profile"></Redirect>
      }
    }
    

    render () {
    return (
    <div className="App">
        {this.state.loggedInUser && this.state.loggedInUser.verifiedEmail &&
          <Route path="/" render={() => <NavigationBar user={this.state.loggedInUser} updateUser={this.updateUser}></NavigationBar>} /> 
        }
        <Route exact path="/" render={() => <Start user={this.state.loggedInUser}/>} />
        <Route exact path="/profile" render={() => this.protected(<Profile user={this.state.loggedInUser} updateUser={this.updateUser}/>)} />
        <Route exact path="/searchArtist" render={() => this.protected(<ShowArtists user={this.state.loggedInUser} updateUser={this.updateUser}></ShowArtists>)} />
        <Route exact path="/signup" render={() => this.redirectExistingUser(<Signup updateUser={this.updateUser}></Signup>)} />
        <Route exact path="/login" render={() => this.redirectExistingUser(<Login updateUser={this.updateUser}></Login>)} />
        <Route exact path="/:artistId/releases" render={({match}) => this.protected(<ShowReleases user={this.state.loggedInUser} updateUser={this.updateUser} artist={match.params.artistName} artistId={match.params.artistId}/>)}/>       
        <Route exact path="/showRelease/:releaseNumber" render={({match}) => this.protected(<SingleRelease user={this.state.loggedInUser} updateUser={this.updateUser} releaseNumber={match.params.releaseNumber} />)} />                                                        
        <Route exact path="/scan" render={() => this.protected(<ScanRecord user={this.state.loggedInUser}/>)} />
    </div>
    );
  }
}

export default App;
