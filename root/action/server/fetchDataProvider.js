import {routeMap} from "../../config/routeMap";
import {matchPath} from "react-router-dom";
import {duct} from "../../config/duct";
import {isNotSet} from "../../utility/checkSet";

export const fetchDataProvider = async function () {
    // find mached routeMap item and define duct.match
    // route item is like this: { path: url.amazonSearch(), component: AmazonSearch, exact: true}
    const selectedRoute = routeMap.find(route => {
        // match is null OR object
        const match = matchPath(duct.req.path, route);

        // match object is equal with compoent match props posted by react-router-dom
        // exp: match object of www.site.com/post/1
        // {
        //     path: '/post/:postId',
        //     url: '/post/1',
        //     isExact: true,
        //     params: {postId: '1'}
        // }
        if (match)
            duct.match = match;

        return match;
    });

    // set response status code
    // when routeMap item have status prop (default is 200)
    // it is useful for none 200 status page like error 404
    // NOTICE: can change status in fetchData() by change duct.status
    if (selectedRoute.status)
        duct.status = selectedRoute.status;


    // fetch data from server
    if (selectedRoute.hasOwnProperty('component'))
        if (selectedRoute.component.hasOwnProperty('fetchData'))
            await
                selectedRoute
                    .component
                    .fetchData(duct)
                    .then(function (response) {
                        if (isNotSet(response))
                            return 'with out data';

                        if (selectedRoute.redux) {
                            // clone of default redux store states
                            duct.storeState[selectedRoute.redux] = response.data;
                            // value of RSSR_UPDATED_REDUX_STATES in index template
                            duct.updatedState = {};
                            duct.updatedState[selectedRoute.redux] = response.data;
                        } else {
                            // value of RSSR_FETCHED_DATA in index template
                            duct.fetchedData = response.data;
                        }
                    });

}