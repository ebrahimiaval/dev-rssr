import React from 'react';
import {routeMap} from "../../setup/routeMap";
import {Route, Switch} from "react-router-dom";
import {jumpScrollToTop} from "../../setup/utility/jumpScrollToTop";


const Router = () => {
    return (
        <Switch>
            {
                routeMap.map((route, index) => {
                    return <Route key={index} {...route} />
                })
            }
            {
                jumpScrollToTop()
            }
        </Switch>
    );
};

export default Router;