import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import {Link} from "react-router-dom";

const UsersTable = ({userCrop, handleSelected, handleUsersDelete, selectedSort, onSort}) => {

    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => (<Link key={user._id} to={`users/${user._id}`}>{user.name}</Link>)
        },
        qualities: {
            name: 'Качества',
            component: (user) => (
                  <QualitiesList qualities={user.qualities}/>
            )
        },
        professions: {path: 'profession.name', name: 'Профессия'},
        completedMeetings: {path: 'completedMeetings', name: 'Встретился, раз'},
        rate: {path: 'rate', name: 'Оценка'},
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                  <Bookmark
                        handleSelected={handleSelected}
                        id={user._id}
                        bookmark={user.bookmark}
                  />)
        },
        delete: {
            component: (user) => (
                  <button
                        className='btn btn-danger btn-sm'
                        onClick={() => handleUsersDelete(user._id)}
                  >
                      delete
                  </button>
            )
        }
    }

    return (
          <Table
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={userCrop}
          >
              <TableHeader
                    {...{onSort, selectedSort, columns}}/>
              <TableBody
                    {...{columns, data: userCrop}}/>
          </Table>
    )
}

UsersTable.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    userCrop: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelected: PropTypes.func.isRequired,
    handleUsersDelete: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
}

export default UsersTable;