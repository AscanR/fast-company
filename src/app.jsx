import React, {useEffect, useState} from 'react'
import API from './api/index'
import SearchStatus from './components/searchStatus'
import Users from './components/users'
import Pagination from './components/pagination'
import {paginate} from './utils/paginate'
import GroupList from "./components/groupList";

const App = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        API.users.fetchAll().then((data) => {
            setUsers(data)
        })
    }, [])

    const [professions, setProfessions] = useState()

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfessions(data)
        })
    }, [])

    const [selectedProf, setSelectedProf] = useState()

    const pageSize = 3

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

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

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const filteredUsers = selectedProf ? users.filter(user => user.profession._id === selectedProf._id) : users

    const count = filteredUsers

    const userCrop = paginate(filteredUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectedProf()
    }

    if (count !== 0) {
        return (
              <div className="d-flex">
                  {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                  items={professions}
                                  selectedItem={selectedProf}
                                  onItemSelect={handleProfessionSelect}
                            />
                            <button
                                  className='btn btn-secondary m-2'
                                  onClick={clearFilter}
                            >
                                Очистить
                            </button>
                        </div>)}
                  <div className="d-flex flex-column">
                      <SearchStatus length={count.length}/>
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
                      <div className="d-flex justify-content-center">
                          <Pagination
                                itemsCount={count.length}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                          />
                      </div>
                  </div>
              </div>
        )
    }

    return (
          <SearchStatus length={count}/>
    )
}

export default App