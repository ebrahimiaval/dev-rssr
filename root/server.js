// action
import {successfulResponse} from "./action/server/successfulResponse";
import {errorResponse} from "./action/server/errorResponse";
import {fetchDataProvider} from "./action/server/fetchDataProvider";
import als from "async-local-storage";


export default function serverRenderer() {
    // start async-local-storage
    als.enable();

    return (req, res, next) => {
        // each request need unique scope
        als.scope();

        // start proccess timer
        const proccessTimeStart = Date.now();

        try {

            /**
             *  SSR data transfer duct
             */
            als.set('res', res, true);

            als.set('reqPath', req.path, true);
            als.set('reqPath', req.path, true);
            als.set('query', req.query, true); //query string of URL as object, for example {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'

            // response status. can chenge to routeMap item status or change in fetchData() and get fetch response status code
            als.set('status', 200, true);

            // match object is equal with compoent match props posted by react-router-dom
            als.set('match', {}, true);

            // for more informaion see fetchDataProvider().
            als.set('updatedState', {}, true);

            // value of RSSR_UPDATED_REDUX_STATES
            // change to real data when server fetch is props base and fetched done successfully
            // for more informaion see fetchDataProvider().
            // als.set('fetchedData',null);

            // selected routeMap item and call fetchData if exist
            fetchDataProvider()
                .then(() => successfulResponse())
                .catch((error) => errorResponse(error, res, proccessTimeStart));
        } catch (error) {
            errorResponse(error, res, proccessTimeStart);
        }
    };
}
