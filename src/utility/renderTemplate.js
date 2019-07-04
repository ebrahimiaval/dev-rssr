import React from 'react';
import Template from "../config/Template";
import {Helmet} from "react-helmet";
import {pickUpdatedStates} from "./pickUpdatedStates";
import ReactDOMServer from "react-dom/server";
import serialize from "serialize-javascript";
import {templatePlaceHolder} from "../config/constant";

export const renderTemplate = function (renderedApp, store) {
    const
        {renderdApp, updatedState} = templatePlaceHolder,
        regExp = new RegExp(Object.keys(templatePlaceHolder).join("|"), "gi"),
        injectMap = {};

    // inject rendered app in server to template
    injectMap[renderdApp] = renderedApp;

    // inject updated redux states to template
    injectMap[updatedState] = serialize(pickUpdatedStates(store));

    let template = <Template helmet={Helmet.renderStatic()}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    // injector
    template = template.replace(regExp, function (matched) {
        if (injectMap.hasOwnProperty(matched))
            return injectMap[matched];
        else
            return matched;
    });

    return template;
}