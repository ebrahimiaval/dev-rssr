import als from "async-local-storage";
import {routeMap} from "../../config/routeMap";
import {matchPath} from "react-router-dom";
import {isNotSet, isSet} from "../../utility/checkSet";



// define public structur and varibales
export const initialize = function (req) {
    /** match **/
        // IS CONSTATN
        // match is match object of react-router-dom
        // match of "site.com/post/1" is:
        //     {
        //         path: '/post/:postId',
        //         url: '/post/1',
        //         isExact: true,
        //         params: {postId: '1'}
        //      }
    const matchedRouteMapItem = routeMap.find(route => {
            // 'null' for not matched
            // 'match object' for matched
            const match = matchPath(req.path, route);

            if (match)
                als.set('match', match, true);

            return match;
        });





    // can not match to any route map item
    if (isNotSet(matchedRouteMapItem))
        throw new Error('⛔ can not match to any route map item! define "*" path for not matched routes. (page not found - Error 404)');





    // calculate parameters
    const
        hasFetch = matchedRouteMapItem.hasOwnProperty('component') && matchedRouteMapItem.component.hasOwnProperty('fetch'),
        fetch = hasFetch ? matchedRouteMapItem.component.fetch : undefined,
        stateName = matchedRouteMapItem.redux,
        fetchType = isSet(fetch) ? (isNotSet(stateName) ? 'PROP_BASE' : 'REDUX_BASE') : 'WITH_OUT_FETCH',
        status = isSet(matchedRouteMapItem.status) ? matchedRouteMapItem.status : 200





    /** status **/
    // IS VARIABLE
    // response status code
    // status get value from sevral places
    // NOTICE: when occur <Redirect> status is 301 literal value
    //
    //   SUCCESSFUL (render index template successfully)
    //          first --> get status prop of matchedRouteMapItem if exist (item of routeMap)
    //          second -> if matchedRouteMapItem has not status get 200 literal value (default value)
    //          third --> if fetchType is not 'WITH_OUT_FETCH' then get API fetch reponse status in fetchProvider() of server
    //          fourth -> 500 literal value when als.get('status') is undefined ( defined in final send response place - res.status())
    //
    //   ERROR (occur an error in make response process)
    //          only -> status is 500
    als.set('status', status, true);





    /** fetch **/
    // IS CONSTATN
    // fetch() of component of matched route item
    // when component has not fetch() then fetch is undefined
    als.set('fetch', fetch, true);





    /** fetchType **/
    // IS CONSTATN
    // when component of matched route map item has not fetch() then fetchType is 'withOutFetch'
    // and when it has then is 'reduxBase' if matched route map item has 'redux' prop and else is 'propBase'
    als.set('fetchType', fetchType, true);





    /** stateName **/
    // IS CONSTATN
    // stateName is name of redux state and define when fetch type is
    if (fetchType === 'REDUX_BASE')
        als.set('stateName', stateName, true);
}
