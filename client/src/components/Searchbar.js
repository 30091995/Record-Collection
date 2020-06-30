import React from 'react'

function Searchbar(props) {

  let searchHandler = (event) => {
    let inputValue = event.target.value
    props.onSearchCallBack(inputValue)
  }

  return (
    <div>
      Search
      <br></br>
      <input type="text" onChange={searchHandler} value={props.currentSearchTerm}></input>
    </div>
  )
}

export default Searchbar