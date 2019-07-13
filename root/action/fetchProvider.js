import {routeMap} from "../config/routeMap";
import {matchPath} from "react-router-dom";
import als from "async-local-storage";
import {isNotSet} from "../utility/checkSet";





export const fetchProvider = async function () {
    // find mached routeMap item and define duct.match
    // route item is like this: { path: url.amazonSearch(), component: AmazonSearch, exact: true}
    const
        reqPath = als.get('reqPath'),
        selectedRoute = routeMap.find(route => {
            // match is null OR object
            const match = matchPath(reqPath, route);

            // match object is equal with compoent match props posted by react-router-dom
            // exp: match object of www.site.com/post/1
            // {
            //     path: '/post/:postId',
            //     url: '/post/1',
            //     isExact: true,
            //     params: {postId: '1'}
            // }
            if (match) {
                // console.log('now > ', match.url);
                // duct.match = match;
                als.set('match', match, true);
            }

            return match;
        }),
        stateName = selectedRoute.redux,
        isPropsBase = isNotSet(stateName);

    // define isPropsBase used in fetcher()
    als.set('isPropsBase', isPropsBase, true);

    // set response status code
    // when routeMap item have status prop (default is 200)
    // it is useful for none 200 status page like error 404
    // NOTICE: can change status in fetch() by change duct.status
    if (selectedRoute.status)
        als.set('status', selectedRoute.status, true);

    // fetch data from server
    if (selectedRoute.hasOwnProperty('component') && selectedRoute.component.hasOwnProperty('fetch')) {
        const
            fetch = selectedRoute.component.fetch,
            ftechParams = {
                match: als.get('match'),
            };

        await
            fetch(ftechParams)
                .then(function (response) {
                    // check data and status exist
                    if (!response.hasOwnProperty('data') || !response.hasOwnProperty('status'))
                        throw new Error('⛔ invalid fetch() response. "data" and "status" is required in success responses. pleace check axios returns.\n');

                    // check status type
                    if (typeof response.status !== "number")
                        throw new Error('⛔ invalid fetch() response. value of "status" is not number! pleace check axios returns.\n');

                    // check status valid range
                    if (response.status < 100 || response.status >= 600)
                        console.warn('📌 value of "status" is not in valid range (1** to 5**). status is ' + response.status)

                    // set server response status code
                    als.set('status', response.status, true);

                    if (isPropsBase) {
                        /** Props Base **/
                        // value of RSSR_DUCT in index template
                        als.set('duct', response.data, true);
                    } else {
                        /** Redux Base **/
                        const updatedState = {[stateName]: response.data};
                        // contain only updated state.
                        // we use updatedState to set value of RSSR_UPDATED_REDUX_STATES in index template on the client
                        // and merge with defaultState of redux to creare store on the server
                        als.set('updatedState', updatedState, true);
                    }
                });
        // catch() will be handel on the server.js with failedRes()
    }
}