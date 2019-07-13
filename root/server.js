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

        console.log('-------------');
        console.log(req.url);
        console.log('-------------');

        try {
            //-------------- current request params -----------------//
            als.set('res', res, true);

            //exp: reqPath is '/post/1' in 'http://www.site.com/post/1?foo=bar'
            als.set('reqPath', req.path, true);

            //exp: reqUrl is '/post/1?foo=bar' in 'http://www.site.com/post/1?foo=bar'
            als.set('reqUrl', req.url, true);

            //exp: query is {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
            als.set('query', req.query, true);

            // response status. can chenge to routeMap item status or change in fetchData() and get fetch response status code
            als.set('status', 200, true);

            // match object is equal with compoent match props posted by react-router-dom
            als.set('match', {}, true);

            // for more informaion see fetchDataProvider().
            als.set('updatedState', {}, true);

            // value of RSSR_UPDATED_REDUX_STATES in index template
            als.set('fetchedData', null, true);
            //-------------------------------------------------------//

            // selected routeMap item and call fetchData if exist
            fetchDataProvider()
                .then(() => successfulResponse())
                .catch((error) => errorResponse(error, res, proccessTimeStart));
        } catch (error) {
            errorResponse(error, res, proccessTimeStart);
        }
    };
}
