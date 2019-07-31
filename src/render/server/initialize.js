import als from "async-local-storage";
import {matchPath} from "react-router-dom";
import {routeMap} from "../../setup/routeMap";
import {isNotSet, isSet} from "../../setup/utility/checkSet";



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
        hasComponent = matchedRouteMapItem.hasOwnProperty('component'),
        hasFetch = hasComponent && matchedRouteMapItem.component.hasOwnProperty('fetch'),
        hasStateName = hasComponent && matchedRouteMapItem.component.hasOwnProperty('redux'),
        //
        fetchType = hasFetch ? (hasStateName ? 'REDUX_BASE' : 'PROP_BASE') : 'WITH_OUT_FETCH',
        status = isSet(matchedRouteMapItem.status) ? matchedRouteMapItem.status : 200





    /** fetchType **/
    // IS CONSTATN
    // when component of matched route map item has not fetch() then fetchType is 'withOutFetch'
    // and when it has then is 'reduxBase' if matched route map item has 'redux' prop and else is 'propBase'
    als.set('fetchType', fetchType, true);





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
    if (hasFetch)
        als.set('fetch', matchedRouteMapItem.component.fetch, true);





    /** stateName **/
    // IS CONSTATN
    // stateName is name of redux state and define when fetch type is
    if (hasStateName)
        als.set('stateName', matchedRouteMapItem.component.redux, true);
}
