import React from "react";
import ReactDOMServer from "react-dom/server";
import {errorLogger} from "../../utility/errorLogger";
import TemplateE500 from "../template/Error500";

export const  serverError = function (res, error, proccessTimeStart) {
    errorLogger('server.js', proccessTimeStart, error);

    let template = <TemplateE500 error={error}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    // ERROR 500 - when occurs an error during process
    res.status(500).send(template);
}
