import React from 'react'
import PropTypes from "prop-types";

const Quality = ({id, color, name}) => {
    return (
          <div
                key={id}
                className={`badge m-1 bg-${color}`}>
              {name}
          </div>)
}

Quality.propTypes = {
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Quality