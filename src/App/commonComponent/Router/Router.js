import React from 'react';
import PropTypes from 'prop-types';
import {routeMap} from "../../../setup/routeMap";
import {Route, Switch} from "react-router-dom";
import {isNotSet} from "../../../setup/utility/checkSet";
import {jumpScrollToTop} from "../../../setup/utility/jumpScrollToTop";




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
 * @param props {object} : subRoute and jump. subRoute is part of routeMap and jump is boolean
 * @returns: a Switch of Routes (show view componnet of matched route)
 */

const Router = (props) => {
    const
        // route list of this Router call
        routeList = isNotSet(props.subRoute) ? routeMap : props.subRoute,
        // jumping by default
        hasJump = isNotSet(props.jump) || props.jump === true;

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
                hasJump ? jumpScrollToTop() : null
            }
        </Switch>
    );
};


Router.propTypes = {
    jump: PropTypes.bool,
    subRoute : PropTypes.arrayOf(PropTypes.object)
};


export default Router;