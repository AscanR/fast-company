import React, { useEffect, useState } from 'react'
import API from '../api'
import SearchStatus from './searchStatus'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import GroupList from './groupList'
import UsersTable from './usersTable'
import _ from 'lodash'

const pageSize = 6

const Users = () => {
    const [users, setUsers] = useState([])
    const [professions, setProfessions] = useState([])
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [currentPage, setCurrentPage] = useState(1)
    const [searchUser, setSearchUser] = useState('')

    useEffect(() => {
        API.users.fetchAll().then((data) => {
            setUsers(data)
        }).then(() => API.professions.fetchAll()
            .then((data) => setProfessions(data)))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchUser])

    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex)

    const handleUsersDelete = (id) => setUsers(prevState => prevState.filter(({ _id }) => _id !== id))

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
        if (searchUser !== '') setSearchUser('')
        setSelectedProf(item)
    }

    const handleSearchUser = ({ target }) => {
        setSelectedProf(undefined)
        setSearchUser(target.value)
    }

    const handleSort = (item) => setSortBy(item)

    const filteredUsers = searchUser
        ? users.filter((user) => user.name.toLowerCase().indexOf(searchUser.toLowerCase()) !== -1)
        : selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users

    const count = filteredUsers

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectedProf()
    }

    if (count.length !== 0) {
        return (
            <div className='d-flex'>
                {professions && (
                    <div className='d-flex flex-column flex-shrink-0 p-3'>
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
                {users && (
                    <div className='d-flex flex-column'>
                        <SearchStatus length={count.length}/>
                        <input
                            type="text"
                            name="searchUser"
                            placeholder="Поиск..."
                            onChange={handleSearchUser}
                            value={searchUser}
                        />
                        {users.length > 0 && (
                            <UsersTable
                                userCrop={userCrop}
                                users={users}
                                handleSelected={handleSelected}
                                handleUsersDelete={handleUsersDelete}
                                onSort={handleSort}
                                selectedSort={sortBy}
                            />
                        )}
                        <div className='d-flex justify-content-center'>
                            <Pagination
                                itemsCount={count.length}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (<SearchStatus length={count.length}/>)
}

export default Users
