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
api.s404 = 'http://www.mocky.io/v2/5d285f852c000058003ed9c6';
api.s200_empty = 'http://www.mocky.io/v2/5d288a902c0000e3393edae5'; // empty data
api.s200 = 'http://www.mocky.io/v2/5d2881ef2c00008b633edab0'; // posts
api.s201 = 'http://www.mocky.io/v2/5d2862592c0000cd2f3ed9d9';
api.s500 = 'http://www.mocky.io/v2/5d287ce82c0000e3393eda93';
api.s502 = 'http://www.mocky.io/v2/5d287c622c00005c693eda90';
api.s504 = 'http://www.mocky.io/v2/5d2869b92c0000cd2f3eda17';


export {api};
