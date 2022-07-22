import React from 'react'
import PropTypes from "prop-types";

const Bookmark = ({handleSelected, id, bookmark}) => {

    return (
          <i
                onClick={() => handleSelected(id)}
                className={`bi bi-bookmark${bookmark ? '-fill' : ''}`}
          />
    )

}

Bookmark.propTypes = {
    handleSelected: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired
}

export default Bookmark