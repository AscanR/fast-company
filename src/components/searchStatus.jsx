import React from 'react'

const SearchStatus = ({length}) => {
    const renderPhrase = (num) => {
        if (num === 1 || num > 4) {
            return 'человек тусанет'
        } else {
            return 'человека тусанут'
        }
    }
    if (length !== 0) {
        return (
              <>
                  <h2>
                      <span className='badge bg-primary m-2'>{`${length} ${renderPhrase(length)} с тобой сегодня`}</span>
                  </h2>
              </>
        )
    }
    return (
          <h2>
              <span className='badge bg-danger m-2'>Никто с тобой не тусанет</span>
          </h2>
    )
}
export default SearchStatus