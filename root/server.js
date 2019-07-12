// action
import {successfulResponse} from "./action/server/successfulResponse";
import {errorResponse} from "./action/server/errorResponse";
import {fetchDataProvider} from "./action/server/fetchDataProvider";
import {defaultState} from "./config/store";



export default function serverRenderer() {
    return (req, res, next) => {
        // start proccess timer
        const proccessTimeStart = Date.now();

        try {

            /**
             * duct : SSR data transfer duct
             *
             */
            const duct = {
                // add request params to duct
                req: req,
                res: res,
                next: next,
                query: req.query, //query string of URL as object, for example {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'


                // in none-redux server fetch storeState is equal
                // and in redux base server fetch contain updated State.
                // for more informaion see fetchDataProvider().
                storeState: {...defaultState},

                // default response status. can chenge to routeMap item status or change in fetchData()
                status: 200,

                // set in routeMap item detector. match object is equal with compoent match props posted by react-router-dom
                match: {},

                // value of RSSR_UPDATED_REDUX_STATES
                // change to real data when server fetch is props base and fetched done successfully
                // for more informaion see fetchDataProvider().
                // fetchedData: null,

                // for more informaion see fetchDataProvider().
                updatedState: {}
            }

            // selected routeMap item and call fetchData if exist
            fetchDataProvider(duct)
                .then(() => successfulResponse(duct))
                .catch((error) => errorResponse(error, res, proccessTimeStart));
        } catch (error) {
            errorResponse(error, res, proccessTimeStart);
        }
    };
}
