// config
import {defaultState} from "./config/store";
// action
import {successfulResponse} from "./action/server/successfulResponse";
import {errorResponse} from "./action/server/errorResponse";
import {fetchDataProvider} from "./action/server/fetchDataProvider";



export default function serverRenderer() {
    return (req, res, next) => {
        // start proccess timer
        const proccessTimeStart = Date.now();

        try {
            // SSR data transfer duct
            const duct = {
                req: req,
                res: res,
                next: next,
                // clone of default redux store states
                storeState: {...defaultState},
                // default response status. can chenge to routeMap item status or change in fetchData()
                status: 200,
                // is like {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
                query: req.query,
                // set in routeMap item detector. match object is equal with compoent match props posted by react-router-dom
                match: {},
            };

            // call fetchData of matched path component and return true or promise
            const fetchingData = fetchDataProvider(duct);

            Promise.resolve(fetchingData)
                .then(() => successfulResponse(duct))
                .catch((error) => errorResponse(error, res, proccessTimeStart));
        } catch (error) {
            errorResponse(error, res, proccessTimeStart);
        }
    };
}
