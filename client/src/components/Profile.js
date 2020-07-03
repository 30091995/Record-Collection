import React, { Component } from 'react'
import axios from 'axios'
import SearchBar from './Searchbar'
import RecordRow from './RecordRow'
import { InputGroup, Input } from 'reactstrap'

class Profile extends Component 
{
    state = {
    searchTerm: "",
    records: []
    }

  componentDidMount () {
    axios.get('/api/records').then((allRecords) => {
      this.setState({
        records : allRecords.data.filter((record) => record.owners.includes(this.props.user._id))
      })
      console.log(this.state.records)
    })
    }

  searchHandler = (event) => {
    this.setState({
        searchTerm : event.target.value
    })
  }
  
  render () {
    let filtered = []
    filtered = this.state.records.filter((record) => record.title.toLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()))
    return(
      <div>   
         {this.props.user ? <h2>Hello {this.props.user.fullname}</h2> : ''}
        <InputGroup className="mb-3">
        <Input
          placeholder="Search your records"
          onChange={this.searchHandler}
          value={this.state.searchTerm}
        />
        </InputGroup>
         {filtered.map((record) => <RecordRow key={record._id} record={record} />)}
      </div>
    )
  }
}

export default Profile