import als from "async-local-storage";
// action
import {render} from "./render";
import {failedRequest} from "./failedRequest";
import {fetchProvider} from "./fetchProvider";
import {initialize} from "./initialize";


export default function serverRenderer() {
    // start async-local-storage
    als.enable();

    return (req, res) => {
        // each request need unique scope
        als.scope();

        const
            timerStart = Date.now(),// use in errorLogger for calculate proccess time
            err = (error) => failedRequest(error, timerStart, res, req); // handle server error during process

        try {
            // define basic parameters
            initialize(req);

            // call fetch() of component and get data
            fetchProvider(req)
                .then(() => render(req, res))
                .catch((e) => err(e));
        } catch (e) {
            err(e)
        }
    };
}
