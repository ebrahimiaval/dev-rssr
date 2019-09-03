import axiosBase from "axios";
import {API_DOMAIN, IS_SERVER} from "../constant";
import {getStore} from "trim-redux";


/**
 * customize axios
 *
 * @param userConfig {object}: custom user config
 * @returns {Promise<AxiosResponse<any> | never>}
 */
export const axios = function (userConfig) {
    let config = {
        // rewire axios default configs
        timeout: 58000,// fix uncontroled server 502 Error
        baseURL: API_DOMAIN,
        headers: {},

        // default value of local custom configs
        token: false,

        // custom user config
        ...userConfig
    }

    // insert Authorization token
    config = tokenProvider(config);

    return axiosBase(config)
    // .then((response) => {
    //     return response;
    // })
        .catch(function (error) {
            // handel error as response
            //
            // !! NOTICE !!
            // this data catch by <DefaultErrors/> becuse data.error is true
            // if you want to catch in your component
            // you must write your catch data structure in fetch() with out data.error or false data.error
            let response = {
                status: null,
                data: {
                    error: true,
                    code: error.code
                }
            };

            if (error.response) {
                response.status = error.response.status;
                response.data.data = error.response.data;
            }
            // handel request time out error
            else if (error.code === 'ECONNABORTED') {
                response.status = 504;
                response.data.data = error.message;
            }
            // handel internet not found error
            else if (error.code === 'ENOTFOUND') {
                response.status = 502;
                response.data.data = error.message;
            }

            if (response.status !== null) {
                // none-200 status (3**, 4**, 5**), request timeout and internet not found
                response.data.status = response.status;
                return response;
            } else {
                // internal errors (like semantic errors) and other request errors (with out timeout)
                throw error;
            }
        });
}




/**
 * token (authentication)
 *    true: get token from redux and set to Authorization header
 *    string: set the string to Authorization header (token string)
 *
 * NOTICE: does not authentication on server so token is valid only on client, if yout want you must develop it!
 */
const tokenProvider = function (config) {
    // ignore on the server
    if (IS_SERVER)
        return config;

    const
        tokenIsTrue = config.token === true,
        tokenIsString = typeof config.token === "string";

    // ignore default value and handel invalid value
    if (!tokenIsString && !tokenIsTrue) {
        if (config.token !== false)
            console.error('⛔ axios error: invalid token property.type of token value must be string or boolean!');

        return config;
    }

    let token = null;
    if (tokenIsTrue) {
        token = getStore('localUser').token;
        if (token === null)
            console.warn('⛔ axios error: user is invalid. axios token property is "true" but user is invalid. you should check user Authentication before call axios!');
    } else if (tokenIsString) {
        if (config.token.length > 0)
            token = config.token;
        else
            console.error('⛔ axios error: invalid axios token property. token is empty!');
    }

    // define Authorization header when valid token exist
    if (token !== null)
        config.headers.Authorization = "Bearer " + token;

    return config;
}
