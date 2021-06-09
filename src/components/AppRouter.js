import React from 'react';
import { Route, Switch } from "react-router-dom";
import { routes } from '../routes';

const AppRouter = () => {
    routes.forEach(i=> console.log(i.Component))
    return (
        <Switch>
            {routes.map(({ path, Component }) => 
                <Route key={path} path={path} component={Component} exact />
            )}
        </Switch>
    );
};

export default AppRouter;