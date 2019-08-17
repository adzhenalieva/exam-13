import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import MainPage from "./containers/MainPage/MainPage";
import PlaceAdd from "./containers/PlaceAdd/PlaceAdd";
import Place from "./containers/Place/Place";


const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to={"/login"}/>
);

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={MainPage}/>
            <ProtectedRoute isAllowed={user }
                            path="/place/new" exact component={PlaceAdd}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/place/:id" exact component={Place}/>
        </Switch>
    );
};

export default Routes;