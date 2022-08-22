import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import api from '../api'
import PropTypes from 'prop-types'
import QualitiesList from './qualitiesList'

const UserInfo = ({userId}) => {
    const history = useHistory()
    const [user, setUser] = useState()
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    })
    const handleClick = () => {
        history.push('/users')
    }
    if (user) {
        return (
              <div className='m-2'>
                  <h1> {user.name}</h1>
                  <h2>Профессия: {user.profession.name}</h2>
                  <QualitiesList qualities={user.qualities}/>
                  <p>completedMeetings: {user.completedMeetings}</p>
                  <h2>Rate: {user.rate}</h2>
                  <button onClick={handleClick}> Все Пользователи</button>
              </div>
        )
    } else {
        return (<h1 className='m-2'>Loading...</h1>)
    }
}

UserInfo.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserInfo