import React from 'react'
import NavBar from './components/navBar'
import {Redirect, Route, Switch} from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'
import NotFound from './layouts/notFound'
import UsersList from './layouts/usersList'

const App = () => {
    return (
          <>
              <NavBar/>
              <Switch>
                  <Route path='/' exact component={Main}/>
                  <Route path='/login' component={Login}/>
                  <Route path='/users/:userId?' component={UsersList} />
                  <Route path='/404' component={NotFound}/>
                  <Redirect to='/404'/>
              </Switch>
          </>
    )
}

export default App