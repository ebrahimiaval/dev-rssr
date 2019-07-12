import {routeMap} from "../../config/routeMap";
import {matchPath} from "react-router-dom";
import als from "async-local-storage";





export const fetchDataProvider = async function () {
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
        });

    // set response status code
    // when routeMap item have status prop (default is 200)
    // it is useful for none 200 status page like error 404
    // NOTICE: can change status in fetchData() by change duct.status
    if (selectedRoute.status)
        als.set('status', selectedRoute.status, true);



    // push data to holder place as Redux base or props base
    const insertData = function (data) {
        // console.log('-------------------');
        // console.log(als.get('match'));
        // console.log('----');
        // console.log('OOPs');
        // console.log('-------------------');

        /** Redux Base **/
        if (selectedRoute.redux) {
            // set value of RSSR_UPDATED_REDUX_STATES in index template
            // contain update state
            als.set('updatedState', {[selectedRoute.redux]: data}, true);
        }
        /** Props Base **/
        else {
            // value of RSSR_FETCHED_DATA in index template
            als.set('fetchedData', data, true);


        }
    }


    // fetch data from server
    if (selectedRoute.hasOwnProperty('component'))
        if (selectedRoute.component.hasOwnProperty('fetchData'))
            await
                selectedRoute
                    .component
                    .fetchData({})
                    .then(function (response) {
                        // insert api response status to server response
                        als.set('status', response.status, true);

                        insertData(response.data);
                    })
                    .catch(function (error) {
                        // handel response none 200 status (3**, 4**, 5**)
                        let data = {error: true, status: null};
                        if (error.response) {
                            data.data = error.response.data;
                            data.status = error.response.status;
                            return true;
                        }
                        // handel request time out error
                        else if (error.code === 'ECONNABORTED') {
                            data.status = 504;
                        }
                        // handel internet not found error
                        else if (error.code === 'ENOTFOUND') {
                            data.status = 502;
                        }

                        if (data.status !== null) {
                            data.code = error.code;
                            insertData(data);
                            als.set('status', data.status, true);
                            return;
                        }

                        // handel internal errors (like semantic errors)
                        // and request errors (with out timeout)
                        throw error;
                    });
}