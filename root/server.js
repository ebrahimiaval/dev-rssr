import als from "async-local-storage";
// action
import {successfulRes} from "./action/server/successfulRes";
import {failedRes} from "./action/server/failedRes";
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
            // define needable structur and varibales
            initialize(req);

            // selected routeMap item and call fetch if exist
            fetchProvider(req)
                .then(() => successfulRes(req, res))
                .catch((error) => failedRes(error, res, proccessTime));
        } catch (error) {
            failedRes(error, res, proccessTime);
        }
    };
}
