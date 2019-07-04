/**
 *
 * @type {boolean}: in client is 'true' and in server is 'false
 */
export const IS_BROWSER = typeof window !== 'undefined';




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



/**
 * used in tamplate for inject date to tamplate
 * see: renderTemplate.js and Template.js
 */
export const templatePlaceHolder = {
    renderdApp: '__RENDERED_APP_INJECT_PLACE__',
    updatedState: '__UPDATED_STATES_INJECT_PLACE__'
}
