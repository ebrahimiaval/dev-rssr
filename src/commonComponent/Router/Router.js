import React from 'react';
import {routeMap} from "../../../root/config/routeMap";
import {Route, Switch} from "react-router-dom";
import {isNotSet} from "../../../root/utility/checkSet";
import {jumpScrollToTop} from "../../../root/utility/jumpScrollToTop";


/**
 * add wrapper component to insert subRoute property to route.component
 * @param route {object} : item of routeMap
 * @returns route {object} : be changed route
 */
const insertSubRoute = function (route) {
    if (route.hasOwnProperty('component') && route.hasOwnProperty('subRoute')) {
        // inserted component
        const TheComponent = route.component;

        // add wrapper component
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

        // replace component
        route.component = WrapperComponent;
    }

    return route;
}



/**
 *
 * @param props <object : subRoute and stopJump. subRoute is part of routeMap and stopJump is boolean
 * @returns {*} : view componnet
 * @constructor
 */

const Router = (props) => {
    let routeList = isNotSet(props.subRoute) ? routeMap : props.subRoute;

    return (
        <Switch>
            {
                routeList.map((route, index) => {
                    route = insertSubRoute(route);

                    return <Route key={index} {...route} />
                })
            }
            {
                // move scroll bar to top of page when route changed
                // ONLY for root
                !props.stopJump ? jumpScrollToTop() : null
            }
        </Switch>
    );
};

export default Router;