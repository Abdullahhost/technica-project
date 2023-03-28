import React, {  useEffect, useState } from 'react'


import './index.css';

const SearchTable = (props) => {
    const[query, setQuery] = useState('')

    useEffect(() => {
        props.onCatchQuery(query)
        
        // eslint-disable-next-line
    },[query])
    
  return (
    <div className='search-container'>
      <input type="text"
       placeholder='Search...' 
       onChange={(e) => setQuery(e.target.value.toLowerCase())}
       value={query}
       />
    </div>
  )
}

export default SearchTable
