// action
import {successfulResponse} from "./action/server/successfulResponse";
import {errorResponse} from "./action/server/errorResponse";
import {fetchDataProvider} from "./action/server/fetchDataProvider";
import {duct} from "./config/duct";



export default function serverRenderer() {
    return (req, res, next) => {
        // start proccess timer
        const proccessTimeStart = Date.now();

        try {
            // add request params to duct
            duct.req = req;
            duct.res = res;
            duct.next = next;
            duct.query = req.query; //query string of URL as object, for example {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'

            // selected routeMap item and call fetchData if exist
            fetchDataProvider()
                .then(() => successfulResponse())
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
