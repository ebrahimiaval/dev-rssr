import als from "async-local-storage";
// action
import {render} from "./action/server/render";
import {failedRequest} from "./action/server/failedRequest";
import {fetchProvider} from "./action/server/fetchProvider";
import {initialize} from "./action/server/initialize";


export default function serverRenderer() {
    // start async-local-storage
    als.enable();

    return (req, res, next) => {
        // each request need unique scope
        als.scope();

        // start proccess timer
        const proccessTime = Date.now();

        try {
            // define basic parameters
            initialize(req);

            // call fetch() of component and get data
            fetchProvider(req)
                .then(() => render(req, res))
                .catch((error) => failedRequest(error, res, proccessTime));
        } catch (error) {
            failedRequest(error, res, proccessTime);
        }
    };
}
