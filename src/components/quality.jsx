import React from 'react'

const Quality = ({id, color, name}) => {
    return (
          <div
                key={id}
                className={`badge m-1 bg-${color}`}>
              {name}
          </div>)
}

export default Quality;