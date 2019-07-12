import {routeMap} from "../../config/routeMap";
import {matchPath} from "react-router-dom";





export const fetchDataProvider = async function (duct) {
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



    // push data to holder place as Redux base or props base
    const insertData = function (data) {
        /** Redux Base **/
        if (selectedRoute.redux) {
            // clone of default redux store states
            duct.storeState[selectedRoute.redux] = data;
            // value of RSSR_UPDATED_REDUX_STATES in index template
            duct.updatedState[selectedRoute.redux] = data;
        }
        /** Props Base **/
        else {
            // value of RSSR_FETCHED_DATA in index template
            duct.fetchedData = data;
        }
    }


    // fetch data from server
    if (selectedRoute.hasOwnProperty('component'))
        if (selectedRoute.component.hasOwnProperty('fetchData'))
            await
                selectedRoute
                    .component
                    .fetchData(duct)
                    .then(function (response) {
                        // insert api response status to server response
                        duct.status = response.status;

                        insertData(response.data);
                    })
                    .catch(function (error) {
                        // handel response none 200 status (3**, 4**, 5**)
                        let data = {error: true, status: null};
                        if (error.response) {
                            data.data = error.response.data;
                            data.status = error.response.status;
                            duct.status = data.status;
                            insertData(data);
                            return true;
                        }
                        // handel request time out error
                        else if (error.code === 'ECONNABORTED') {
                            data.status = 'ECONNABORTED';
                            duct.status = 504;
                        }
                        // handel internet not found error
                        else if (error.code === 'ENOTFOUND') {
                            data.status = 'ENOTFOUND';
                            duct.status = 502;
                        }

                        if (data.status !== null) {
                            insertData(data);
                            return;
                        }

                        // handel internal errors (like semantic errors)
                        // and request errors (with out timeout)
                        throw error;
                    });
}