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
        const proccessTime = Date.now();

        try {
            //-------------- current request params -----------------//
            als.set('res', res, true);

            //exp: '/post/1' in 'http://www.site.com/post/1?foo=bar'
            als.set('reqPath', req.path, true);

            //exp: '/post/1?foo=bar' in 'http://www.site.com/post/1?foo=bar'
            als.set('reqUrl', req.url, true);

            //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
            als.set('query', req.query, true);

            // response status. can chenge to routeMap item status or change in fetchData() and get fetch response status code
            als.set('status', 200, true);

            // match object is equal with compoent match props posted by react-router-dom
            als.set('match', {}, true);

            // contain only updated state.
            // we use updatedState to set value of RSSR_UPDATED_REDUX_STATES in index template on the client
            // and merge with defaultState of redux to creare store on the server
            als.set('updatedState', {}, true);

            // value of RSSR_DUCT in index template (channel for passing data to client from server)
            als.set('duct', null, true);
            //-------------------------------------------------------//

            // selected routeMap item and call fetchData if exist
            fetchDataProvider()
                .then(() => successfulResponse())
                .catch((error) => errorResponse(error, res, proccessTime));
        } catch (error) {
            errorResponse(error, res, proccessTime);
        }
    };
}
