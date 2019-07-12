import React from 'react';
import {routeMap} from "./routeMap";
import {Route, Switch} from "react-router-dom";
import {duct} from "./duct";
import Error404 from "../../src/App/Error404/Error404";
import {IS_SERVER} from "./constant";

const Router = () => {
    let status;
    if (IS_SERVER) {
        status = duct.status;
    } else {
        status = window.RSSR_STATUS;
        delete window.RSSR_STATUS;
    }

    // you can handel other view statuses
    if (status === 404)
        return <Error404/>;

    return (
        <Switch>
            {
                routeMap.map((route, index) => <Route key={index} {...route} />)
            }
            {
                // move scroll bar to top of page when route changed
                // jumpScrollToTop()
            }
        </Switch>
    );
};

export default Router;