import React from 'react'

let style = { maxWidth: '700px' }
let btn = { cursor: 'pointer' }

const List = (props) => (
  <ul className="siimple-list">
    {props.plantss.map((plants, i) => {
      return <li key={i} className="siimple-list-item siimple--bg-white" style={style}>{plants.name} <span className="siimple-tag siimple-tag--error siimple-hover" style={btn} onClick={() => props.handleRemove(i)}>Delete</span></li>
    })}
  </ul>
)

export default List