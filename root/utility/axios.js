import axiosBase from "axios";
import {API_DOMAIN, IS_SERVER} from "../config/constant";
import {getStore} from "trim-redux";

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
 import {getStore} from "trim-redux";
 // utility
 import {isSet} from "./checkSet";


 * extended version of jquery ajax
 *
 * ### config ( use jQuery ajax config in addition to bellow config)
 *      raw : (default undefined)
 *              true : dont change JSON.stringify and processData
 *              other type : convert data with JSON.stringify and disable processData
 *      name : <require> name of this ajax. use for abort and error handeling
 *      token : (default true)
 *              true : get from redux and set Authorization header
 *              string : set the string for header Authorization
 *              other type : dont set any header
 *
 * ### template
 *   ajax({
 *      name: '',
 *      token: true
 *    })
 *       //--------------------------------------------------
 *       .done((response) => {
 *       })
 *       //--------------------------------------------------
 *       .fail((xhr, textStatus, text) => {
 *          if (text !== 'abort')
 *              toast.error('error - check connection!');
 *       });
 *
 var ajaxHolder = {};
 export const ajax = (config) => {

    // handel name parameter
    if (typeof config.name === 'undefined')
        console.error("ajax need 'name' property in config object.", config);
    const name = config.name;
    delete config.name;

    // handel token parameter
    // token =
    //     true : get from redux and set Authorization header
    //     string : set the string for header Authorization
    //     other type : dont set any header
    //
    if (typeof config.token === "string" || config.token === true) {
        const token = (config.token === true) ? getStore('localUser').token : config.token;
        config.headers = {"Authorization": "Bearer " + token}
        delete config.token;
    }

    if (config.raw !== true) {
        if (isSet(config.data)) {
            // convert JSON5 data to JSON
            config.data = JSON.stringify(config.data);

            // disabel processData (can send json data)
            config.processData = false;
        }

        // extend
        config = {
            timeout: 60000,
            contentType: 'application/json',
            dataType: 'json',
            ...config
        }
    }

    // define jquery ajax method
    const ajax = $.ajax(config);

    // abort last ajax
    if (ajaxHolder[name] && config.parallel !== true)
        ajaxHolder[name].abort();

    // save ajax object
    ajaxHolder[name] = ajax;

    // remove when complete
    ajax.always(() => {
        delete ajaxHolder[name]
    });

    // show error
    ajax.fail((xhr, textStatus, text) => {
        // && config.validStatus.inArray()
        if (text !== 'abort' && config.disabelErrorLog) {
            let errors = [];

            errors[0] = `error in ${name} ajax.\n`;

            if (typeof xhr.responseText !== 'undefined' && xhr.responseText !== "")
                errors.push(xhr.responseText);

            if (typeof xhr.responseText !== 'undefined' && text !== "")
                errors.push(text);

            if (typeof xhr.responseText !== 'undefined' && textStatus !== "")
                errors.push(textStatus);

            console.error(...errors);
        }
    });

    // return ajax promise object
    return ajax;
}
 */