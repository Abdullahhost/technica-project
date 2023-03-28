import React from 'react'

import  './index.css'
const Table = ({data}) => {

  return(
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Co</th>
          <th>Avvailiblity</th>
          <th>Need to repair</th>
          <th>Durablity</th>
          <th>Mileage</th>
        </tr>
      </thead>
      
      <tbody>
        {
          data && data?.map((element, index) => {
          let {id, code, name, availability, durability, mileage, needing_repair} = element;
          return(
            <tr  key={id} className={index % 2!== 0 ? "odd_class" : 'even_class'}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{code}</td>
              <td>{availability.toString()}</td>
              <td>{needing_repair.toString()}</td>
              <td>{durability}</td>
              <td>{mileage}</td>
            </tr>
            )
          })
        }

      </tbody>
    </table>
  )

}

export default Table
