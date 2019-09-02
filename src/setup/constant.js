/**
 * @type {boolean}: IS_BROWSER in client is 'true' and in server is 'false' and IS_SERVER is reversed
 */
export const IS_BROWSER = typeof window !== 'undefined';
export const IS_SERVER = !IS_BROWSER;




/**
 * API_HOST_IN_CLIENT (in .env file) use in browser for AJAX request and
 * API_HOST_IN_SERVER in server (node js) for HTTP request (fetch data)
 *
 * this routes can be equal for two side but
 * in server (fetch data) is better use API machine IP.
 * for example:
 *     API_HOST_IN_CLIENT = https://api.site.com
 *     API_HOST_IN_SERVER = 192.168.2.1
 */
export const API_DOMAIN = IS_BROWSER ? process.env.API_HOST_IN_CLIENT : process.env.API_HOST_IN_SERVER;


export const DUCT_DEFAULT_VALUE = {isLoading: true};