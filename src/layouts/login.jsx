import React, { useState } from 'react'

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' })
    const handleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }
    return (
        <form action="">
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" name='email' id='email' value={data.email} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <input type="password" name='password' id='password' value={data.password} onChange={handleChange}/>
            </div>
        </form>
    )
}

export default Login