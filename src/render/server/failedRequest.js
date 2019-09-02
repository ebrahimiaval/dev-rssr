import React from "react";
import ReactDOMServer from "react-dom/server";
// utility
import {errorLogger} from "../../setup/utility/errorLogger";
// component
import Error from "../template/Error";


/**
 * handel server errors
 * :: like semantic errors in try-catch
 *
 * @param error {object}: error object like axios error object
 * @param timerStart {number}: time stamp of start reqest proccesses
 * @param res {object}: server response object. used for send response
 * @param req {object}: server request object. used for get user IP to log on console
 */
export const failedRequest = function (error, timerStart, res, req) {
    // log to console
    errorLogger('server.js', timerStart, error, false, req);

    //rendered Error template to string
    let response = <Error error={error}/>;
    response = ReactDOMServer.renderToString(response);
    response = '<!DOCTYPE html>' + response;

    // ERROR 500 - when occurs an error during process
    res.status(500).send(response);
}
