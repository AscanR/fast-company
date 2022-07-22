import React from 'react'
import Quality from './quality'
import Bookmark from './bookmark'
import PropTypes from "prop-types";

const User = ({id, name, qualities, profession, completedMeetings, rate, handleSelected, handleUsersDelete, bookmark}) => {
    return (
          <>
              <tr key={id}>
                  <td>{name}</td>
                  <td>{qualities.map(
                        (quality) => {
                            return <Quality
                                  id={quality._id}
                                  name={quality.name}
                                  color={quality.color}
                                  key={quality._id}
                            />
                        })}
                  </td>
                  <td>{profession.name}</td>
                  <td>{completedMeetings}</td>
                  <td>{rate}</td>
                  <td>
                      <Bookmark
                            handleSelected={handleSelected}
                            id={id}
                            bookmark={bookmark}
                      />
                  </td>
                  <td>
                      <button
                            className='btn btn-danger btn-sm'
                            onClick={() => handleUsersDelete(id)}
                      >
                          delete
                      </button>
                  </td>
              </tr>

          </>
    )
}

User.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    handleSelected: PropTypes.func.isRequired,
    handleUsersDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired
}

export default User