import React from 'react';
import {routeMap} from "../../../root/config/routeMap";
import {Route, Switch} from "react-router-dom";
import {isNotSet} from "../../../root/utility/checkSet";

const Router = (props) => {
    let routeList = isNotSet(props.subRoute) ? [...routeMap] : [...props.subRoute];

    return (
        <Switch>
            {
                routeList.map((route, index) => {
                    // in React-Router Document
                    // Warning: <Route component> takes precedence over <Route render> so don’t use both in the same <Route>.
                    if (route.hasOwnProperty('component') && route.hasOwnProperty('subRoute')) {
                        const Component = route.component;

                        // push subRoute to Component as props
                        route.render = function (props) {
                            props.subRoute = route.subRoute;
                            return <Component {...props} />;
                        }

                        delete route.component;
                    }

                    return <Route key={index} {...route} />
                })
            }
            {
                // move scroll bar to top of page when route changed
                // jumpScrollToTop()
            }
        </Switch>
    );
};

export default Router;