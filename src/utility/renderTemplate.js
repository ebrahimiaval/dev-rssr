import React from 'react';
import Template from "../config/Template";
import {Helmet} from "react-helmet";
import {pickUpdatedStates} from "./pickUpdatedStates";
import ReactDOMServer from "react-dom/server";
import serialize from "serialize-javascript";

export const renderTemplate = function (renderedApp, store) {
    let template = <Template helmet={Helmet.renderStatic()}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    const injectMap = {
        '__renderedApp__' : renderedApp, // inject rendered app in server to template
        '__UPDATED_REDUX_STATES__':serialize(pickUpdatedStates(store)) // inject updated redux states to template
    }

    template = template.replace(/__renderedApp__|__UPDATED_REDUX_STATES__/gi, function (matched) {
            return injectMap[matched];
    });

    return template;
}