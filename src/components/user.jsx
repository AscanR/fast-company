import React from 'react'
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({id, name, qualities, profession, completedMeetings, rate, handleSelected, handleUsersDelete, ...user}) => {
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
                            {...user}
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

export default User