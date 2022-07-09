import React, {useState} from "react"
import API from '../api'

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll())

    const handleUsersDelete = (id) => {
        setUsers((prevState => prevState.filter((user) => user._id !== id)))
    }

    const renderPhrase = (num) => {
        if(num === 1 || num > 4) {
            return 'человек тусанет'
        } else {return 'человека тусанут'}
    }

    const renderUsersTable = () => {
        return users.length !== 0
              ? users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.qualities.map(
                              quality =>
                                    <div
                                          key={quality._id}
                                          className={`badge m-1 bg-${quality.color}`}>
                                        {quality.name}
                                    </div>)}
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate}</td>
                        <td>
                            <button
                                  className='btn btn-danger btn-sm'
                                  onClick={() => handleUsersDelete(user._id)}
                            >
                                delete
                            </button>
                        </td>
                    </tr>
              ))
              : 'No users'
    }

    if (users.length !== 0) {
        return (
              <>
                  <h2><span className='badge bg-primary m-2'>{`${users.length} ${renderPhrase(users.length)} с тобой сегодня`}</span></h2>
                  <table className="table m-2">
                      <thead>
                      <tr>
                          <th scope="col">Имя</th>
                          <th scope="col">Качества</th>
                          <th scope="col">Профессия</th>
                          <th scope="col">Встретился, раз</th>
                          <th scope="col">Оценка</th>
                          <th scope="col"></th>
                      </tr>
                      </thead>
                      <tbody>
                      {renderUsersTable()}
                      </tbody>
                  </table>
              </>)
    }

    return (
          <>
              <h2><span className='badge bg-danger m-2'>Никто с тобой не тусанет</span></h2>
          </>
    )
}


export default Users