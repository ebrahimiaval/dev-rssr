// utility
import {dataType} from "./dataType";
// config
import {API_DOMAIN} from "../config/constant";



/**
 *  prepend API_HOST_IN_CLIENT (in browser) and API_HOST_IN_SERVER (in server)
 *  to routes item or pass to route function
 *  example:
 *     if routes.home === '/home' and API_HOST_IN_CLIENT === 'api.site.com' then
 *        apiRouteBuilder() convert routes.home to 'api.site.com/home'

 * @param routesObj
 * @returns {{[p: string]: *}}
 */
export const apiRouteBuilder = function (routeList) {
    const routes = {...routeList};

    const actionApiBuilder = function (item) {
        return function () {
            return API_DOMAIN + routeList[item].apply({}, arguments);
        };
    }

    for (let item in routes) {
        if (routes.hasOwnProperty(item))
            switch (dataType(routes[item])) {
                case 'string' :
                    routes[item] = API_DOMAIN + routes[item];
                    break;
                case 'function' :
                    routes[item] = actionApiBuilder(item);
                    break;
                case 'object' :
                    routes[item] = apiRouteBuilder(routes[item]);
                    break;
                default:
                    console.error(item, 'invalid api route. only string and function is valid.');
            }
    }

    return routes;
}
