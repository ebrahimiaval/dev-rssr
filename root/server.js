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
            // SSR data transfer duct
            // NOTICE: updatedState and fetchedData can be params of duct
            // but when have server fetch data.for more informaion see fetchDataProvider().
            const duct = {
                req: req,
                res: res,
                next: next,
                // in none-redux server fetch storeState is equal
                // and in redux base server fetch contain updated State.
                // for more informaion see fetchDataProvider().
                storeState: {...defaultState},
                // default response status. can chenge to routeMap item status or change in fetchData()
                status: 200,
                // is like {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
                query: req.query,
                // set in routeMap item detector. match object is equal with compoent match props posted by react-router-dom
                match: {},
            };

            // selected routeMap item and call fetchData if exist
            fetchDataProvider(duct)
                .then(() => successfulResponse(duct))
                .catch((error) => {
                    console.log('fetch error');
                    errorResponse(error, res, proccessTimeStart)
                });
        } catch (error) {
            console.log('process error');
            errorResponse(error, res, proccessTimeStart);
        }
    };
}
