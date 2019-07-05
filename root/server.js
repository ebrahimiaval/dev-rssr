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
            // SSR data transfer duct
            const duct = {
                req: req,
                res: res,
                storeState: {...defaultState},
                status: 200, // default response status
                query: req.query,// is like {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
            };

            // find mached routeMap item and define duct.match
            // route item is like this: { path: url.amazonSearch(), component: AmazonSearch, exact: true}
            const currentRoute = routeMap.find(route => {
                // match is null OR object
                // match object is equal with compoent match props posted by react-router-dom
                // exp: match object of www.site.com/post/1
                // {
                //     path: '/post/:postId',
                //     url: '/post/1',
                //     isExact: true,
                //     params: {postId: '1'}
                // }
                const match = matchPath(req.path, route);

                if (match)
                    duct.match = match;

                return match;
            });

            // set response status code
            // when routeMap item have status prop (default is 200)
            // it is useful for none 200 status page like error 404
            // NOTICE: can change status in fetchData() by change duct.status
            if (currentRoute.status)
                duct.status = currentRoute.status;

            // fetch data from server
            let initialData = true;
            if (currentRoute.hasOwnProperty('component'))
                if (currentRoute.component.hasOwnProperty('fetchData'))
                    initialData = currentRoute.component.fetchData(duct);

            Promise.resolve(initialData)
                .then(() => {
                    successfulResponse(req, res, duct.status, duct.storeState);
                })
                .catch((error) => {
                    errorResponse(res, error, proccessTimeStart);
                });
        } catch (error) {
            errorResponse(res, error, proccessTimeStart);
        }
    };
}
