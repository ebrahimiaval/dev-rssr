import React from "react";
import ReactDOMServer from "react-dom/server";
// utility
import {errorLogger} from "../utility/errorLogger";
// component
import Error from "../template/Error";




/**
 * @param error {object}: error obejct
 * @returns {string}: rendered Error template to string
 */
const renderErrorTemplate = function (error) {
    let template = <Error error={error}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    return template;
}




/**
 * @param res {object}: express response object
 * @param error {object}: error obejct
 * @param proccessTimeStart
 */
export const errorResponse = function (res, error, proccessTimeStart) {
    errorLogger('server.js', proccessTimeStart, error);

    // ERROR 500 - when occurs an error during process
    res.status(500).send(renderErrorTemplate(error));
}