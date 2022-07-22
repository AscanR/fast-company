import React, {useState} from 'react'
import API from './api/index'
import SearchStatus from './components/searchStatus'
import Users from './components/users'
import Pagination from './components/pagination'
import {paginate} from './utils/paginate'

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll())

    const count = users.length

    const pageSize = 4

    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

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

    const userCrop = paginate(users, currentPage, pageSize)

    if (count !== 0) {
        return (
              <>
                  <SearchStatus length={users.length}/>
                  <table className='table m-2'>
                      <thead>
                      <tr>
                          <th scope='col'>Имя</th>
                          <th scope='col'>Качества</th>
                          <th scope='col'>Профессия</th>
                          <th scope='col'>Встретился, раз</th>
                          <th scope='col'>Оценка</th>
                          <th scope='col'>Избранное</th>
                          <th scope='col'/>
                      </tr>
                      </thead>
                      <tbody>
                      <Users
                            users={users}
                            handleSelected={handleSelected}
                            handleUsersDelete={handleUsersDelete}
                            userCrop={userCrop}

                      />
                      </tbody>
                  </table>
                  <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                  />
              </>)
    }

    return (
          <SearchStatus length={users.length}/>
    )
}

export default App