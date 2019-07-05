// utility
import {apiRouteBuilder} from "../utility/apiRouteBuilder";


/**
 * API path of your application.
 * exp:
 *  if you get home page data from 'https://api.site.com/home, you must
 *  define 'https://api.site.com' as API_HOST_IN_CLIENT and API_HOST_IN_SERVER
 *  in .env file in root of project, then in below api object define 'home' property with '/home' value
 *  and in fetchData method use 'api.home' to access to api url.
 */
let api = {
    signin: '/your-route',
    signup: '/your-route',
    posts: '/posts',
    userDetails: '/userDetails',
    post: (id) => '/posts/' + id
}





/**
 * apiRouteBuilder prepend API host like "https://api.site.com" to each item
 * and return api object with full path api routes.
 * API Route defined in '.env' as API_HOST_IN_CLIENT & API_HOST_IN_SERVER.
 *
 * NOTICE: you can eject apiRouteBuilder() and add API host manually by add 'API_DOMAIN' to each item.
 * API_DOMAIN defined in 'src/config/constant'.
 *
 */
api = apiRouteBuilder(api);


/**
 * NOTICE: if you have an API with different Host, must DEFINE HERE (after apiRouteBuilder) with full path.
 * exp:
 *  api.statistics = 'https://otherSite.com/api/statistics/2'
 */
// different Hosts


export {api};
