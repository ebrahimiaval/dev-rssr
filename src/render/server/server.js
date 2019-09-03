import als from "async-local-storage";
// action
import {render} from "./render";
import {fetchProvider} from "./fetchProvider";
import {initialize} from "./initialize";


export default function serverRenderer() {
    // start async-local-storage
    als.enable();

    return (req, res) => {
        // each request need unique scope to can define and work with variables over the request
        als.scope();

        const
            timerStart = Date.now(),// use in errorLogger for calculate proccess time
            // err = (error) => failedRequest(error, timerStart, res, req); // handle server error during process
            err = (error) => render(req, res, error, timerStart); // handle server error during process

        try {
            // define basic parameters
            initialize(req);

            // call fetch() of component and get data
            fetchProvider(req)
                .then(() => render(req, res)) // get data successfully
                .catch((e) => err(e)); // occur error in fetchProvider() or render()
        } catch (e) {
            err(e) // occur error in try
        }
    };
}
