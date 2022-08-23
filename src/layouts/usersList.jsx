import React from 'react'
import { useParams } from 'react-router-dom'
import Users from '../components/users'
import UserInfo from '../components/userInfo'

const UsersList = () => {
    const params = useParams()
    const { userId } = params
    return <>{userId ? <UserInfo userId={userId}/> : <Users/>}</>
}

export default UsersList
