import React from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NotFound from "./layouts/notFound";
import Users from "./layouts/users";

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path='/users/:userId?/:edit?' component={Users}/>
                <Route path='/users/:userId?' component={Users}/>
                <Route path='/login/:type?' component={Login}/>
                <Route path='/' exact component={Main}/>
                <Route path='/404' component={NotFound}/>
                <Redirect to='/404'/>
            </Switch>
        </>
    );
};

export default App;
