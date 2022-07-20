import React from 'react'

const Bookmark = ({handleSelected, id, ...user}) => {

    if (user.bookmark) {
        return (
              <i
                    onClick={() => handleSelected(id)}
                    className='bi bi-bookmark-fill'
              ></i>
        )
    }

    return (
          <i
                onClick={() => handleSelected(id)}
                className='bi bi-bookmark'
          ></i>
    )

}

export default Bookmark;