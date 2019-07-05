
import {matchPath} from "react-router-dom";
// config
import {defaultState} from "../config/store";
import {routeMap} from "../config/routeMap";
// utility
import {serverRender} from "./action/serverRender";
import {serverError} from "./action/serverError";




export default function serverRenderer() {
    return (req, res, next) => {
        // start proccess timer
        const proccessTimeStart = Date.now();

        try {
            let storeState = {...defaultState};

            // default status code
            let status = 200;

            // matchPath can not know Query string Because of this we split and remvoe Query strin.
            // EXP: '/search?q=watch' -> '/search'
            const reqUrl = req.url.split('?')[0];

            // find route item mached with reqUrl
            // route item is like this: { path: url.amazonSearch(), component: AmazonSearch, exact: true}
            const currentRoute = routeMap.find(route => matchPath(reqUrl, route));

            // fetch data from server
            let initialData = true;
            if (currentRoute.hasOwnProperty('component'))
                if (currentRoute.component.hasOwnProperty('fetchData'))
                    initialData = currentRoute.component.fetchData({req, storeState});

            // set response status code if route have status prop (default is 200)
            // it is useful for 404 page
            if (currentRoute.status)
                status = currentRoute.status;

            /**
             * render template when API resolved
             */
            Promise.resolve(initialData)
                .then(() => {
                    serverRender(storeState, req, res, status);
                })
                .catch((error) => {
                    serverError(res, error, proccessTimeStart);
                });
        } catch (error) {
            serverError(res, error, proccessTimeStart);
        }
    };
}
