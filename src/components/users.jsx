import React from 'react'
import User from './user'
import PropTypes from "prop-types";

const Users = ({handleSelected, handleUsersDelete, userCrop}) => {
    return (
          userCrop.map(user => {
              return <User
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    qualities={user.qualities}
                    profession={user.profession}
                    rate={user.rate}
                    completedMeetings={user.completedMeetings}
                    handleSelected={handleSelected}
                    handleUsersDelete={handleUsersDelete}
                    bookmark={user.bookmark}
              />
          })
    )
}

Users.propTypes = {
    handleSelected: PropTypes.func.isRequired,
    handleUsersDelete: PropTypes.func.isRequired,
    userCrop: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Users