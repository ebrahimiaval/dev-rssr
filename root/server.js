import {matchPath} from "react-router-dom";
// config
import {defaultState} from "./config/store";
import {routeMap} from "./config/routeMap";
// utility
import {successfulResponse} from "./action/serverResponse.successful";
import {errorResponse} from "./action/serverResponse.error";




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


            Promise.resolve(initialData)
                .then(() => {
                    successfulResponse(req, res, status, storeState);
                })
                .catch((error) => {
                    errorResponse(res, error, proccessTimeStart);
                });
        } catch (error) {
            errorResponse(res, error, proccessTimeStart);
        }
    };
}
