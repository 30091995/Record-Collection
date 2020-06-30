import React, { Component } from 'react'
import axios from 'axios'
import SearchBar from './Searchbar'
import RecordRow from './RecordRow'
import NavigationBar from './NavigationBar.js'


class Profile extends Component 
{
    state = {
    searchTerm: "",
    records: []
    }



updateUser = () => {
    this.props.updateUser(null)
  }


  componentDidMount () {
    axios.get('/api/records').then((allRecords) => {
      this.setState({
        records : allRecords.data.filter((record) => record.owners.includes(this.props.user._id))
      })
      console.log(this.state.records)
    })
    }

  searchHandler = (search) => {
    this.setState({
        searchTerm : search
    })
  }
  
  render () {
    let filtered = []
    filtered = this.state.records.filter((record) => record.albumName.toLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()))
    return(
      <div>   
      <NavigationBar logoutUser={this.updateUser}></NavigationBar>
         {this.props.user ? <h2>Hello {this.props.user.fullname}</h2> : ''}
        <SearchBar onSearchCallBack={this.searchHandler} currentSearchTerm={this.state.searchTerm} />
         {filtered.map((record) => <RecordRow key={record._id} record={record} />)}
      </div>
    )
  }
}

export default Profile