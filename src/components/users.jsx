import React from 'react'
import User from './user'


const Users = ({users, handleSelected, handleUsersDelete}) => {
    return (
          users.map(user => {
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
                    {...user}
              />
          })
    )
}

export default Users