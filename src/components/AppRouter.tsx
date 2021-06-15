import React from 'react';
import { Route, Switch } from "react-router-dom";
import { routes } from '../routes';

const AppRouter = () => {
    return (
        <Switch>
            {routes.map(({ path, Component }) => 
                <Route key={path} path={path} component={ Component} />
            )}
        </Switch>
    );
};


export default AppRouter;