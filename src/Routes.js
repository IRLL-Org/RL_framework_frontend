import React from "react"
import { Route, Switch } from "react-router"
import Start from './start';
import Main from './main';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Start} />
            <Route exact path="/game/" component={Main} />
        </Switch>
        )
    }
      
export default Routes