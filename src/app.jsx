import React from 'react'
import NavBar from "./components/navBar";
import {Redirect, Route, Switch} from "react-router-dom";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NotFound from "./layouts/notFound";

const App = () => {
    return (
          <>
              <NavBar/>
              <Switch>
                  <Route path='/' exact component={Main}/>
                  <Route path='/login' component={Login}/>
                  <Route path='/users' component={Users}/>
                  <Route path='/404' component={NotFound}/>
                  <Redirect to='/404'/>
              </Switch>
          </>
    )
}

export default App