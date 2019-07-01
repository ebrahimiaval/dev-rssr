import {getStore} from "trim-redux";
import {$} from "../config/jquery";
import {isSet} from "./isSet";


/**
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
 */
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