import React, {useState} from 'react'
import API from './api/index'
import SearchStatus from './components/searchStatus'
import Users from './components/users'

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll())

    const handleUsersDelete = (id) => {
        setUsers((prevState => prevState.filter(({_id}) => _id !== id)))
    }


    const handleSelected = (id) => {
        setUsers(
              users.map(user => {
                  if (user._id === id) {
                      user.bookmark = !user.bookmark
                  }
                  return user
              })
        )
    }

    if (users.length !== 0) {
        return (
              <>
                  <SearchStatus length={users.length}/>
                  <table className="table m-2">
                      <thead>
                      <tr>
                          <th scope="col">Имя</th>
                          <th scope="col">Качества</th>
                          <th scope="col">Профессия</th>
                          <th scope="col">Встретился, раз</th>
                          <th scope="col">Оценка</th>
                          <th scope="col">Избранное</th>
                          <th scope="col"/>
                      </tr>
                      </thead>
                      <tbody>
                      <Users
                            users={users}
                            handleSelected={handleSelected}
                            handleUsersDelete={handleUsersDelete}

                      />
                      </tbody>
                  </table>
              </>)
    }

    return (
          <SearchStatus length={users.length}/>
    )
}

export default App