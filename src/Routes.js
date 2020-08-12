import React from "react"
import { Route, Switch } from "react-router"
import Start from './start';
import Main from './main';
import Quiz from './quiz';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/consent/" component={Start} />
            <Route exact path="/quiz/" component={Quiz} />
            <Route exact path="/game/" component={Main} />
        </Switch>
        )
    }
      
export default Routes