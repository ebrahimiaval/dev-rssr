import React from 'react';
import {routeMap} from "../../../root/config/routeMap";
import {Route, Switch} from "react-router-dom";
import {isNotSet} from "../../../root/utility/checkSet";

const Router = (props) => {
    // let routeList = routeMap;
    let routeList = isNotSet(props.subRoute) ? routeMap : props.subRoute;

    return (
        <Switch>
            {
                routeList.map((route, index) => {
                    if (route.hasOwnProperty('component') && route.hasOwnProperty('subRoute')) {
                        const TheComponent = route.component;
                        const WrapperComponent = function (prop) {
                            const props = {...prop};
                            props.subRoute = route.subRoute;
                            return <TheComponent {...props}/>
                        };

                        // clone static props
                        Object.getOwnPropertyNames(TheComponent).forEach(function (key) {
                            if (!WrapperComponent.hasOwnProperty(key))
                                WrapperComponent[key] = TheComponent[key];
                        });

                        route.component = WrapperComponent;
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