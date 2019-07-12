import React from 'react';
import {routeMap} from "./routeMap";
import {Route, Switch} from "react-router-dom";

const Router = () => {
    // let status;
    // if (IS_SERVER) {
    //     status = duct.status;
    // } else {
    //     status = window.RSSR_STATUS;
    // }
    //
    // // you can handel other view statuses
    // if (status === 404)
    //     return <Error404/>;

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