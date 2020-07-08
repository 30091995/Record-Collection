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
import VerifyEmail from './components/VerifyEmail.js'

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
      if (this.state.loggedInUser) {
        return comp
      } else {
        return <Redirect to="/login"></Redirect>
      }
    }
    

    render () {
    return (
    <div className="App">
    {this.state.loggedInUser ? <Route path="/" render={() => <NavigationBar user={this.state.loggedInUser} updateUser={this.updateUser}></NavigationBar>} /> : null }
        <Route exact path="/" render={() => <Start user={this.state.loggedInUser}/>} />
        <Route exact path="/profile" render={() => this.protected(<Profile user={this.state.loggedInUser} updateUser={this.updateUser}/>)} />
        <Route exact path="/searchArtist" render={() => this.protected(<ShowArtists user={this.state.loggedInUser} updateUser={this.updateUser}></ShowArtists>)} />
        <Route exact path="/signup" render={() => <Signup updateUser={this.updateUser}></Signup>} />
        <Route exact path="/login" render={() => <Login updateUser={this.updateUser}></Login>} />
        <Route exact path="/artist/:artistId/releases" render={({match}) => this.protected(<ShowReleases user={this.state.loggedInUser} updateUser={this.updateUser} artistId={match.params.artistId}/>)}/>
        <Route exact path="/verify-email" render={() => <VerifyEmail />} />
                                                                                           
        <Route exact path="/scan" render={() => <ScanRecord user={this.state.loggedInUser}/>} />

        <Route exact path="/showRelease/:releaseNumber" render={({match}) => <SingleRelease user={this.state.loggedInUser} updateUser={this.updateUser} releaseNumber={match.params.releaseNumber} />} />

    </div>
    );
  }
}

export default App;
