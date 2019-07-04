import React from 'react';
import {Helmet} from "react-helmet";
import ReactDOMServer from "react-dom/server";
import serialize from "serialize-javascript";
import {pickUpdatedStates} from "./pickUpdatedStates";
import {templatePlaceHolder} from "../config/constant";
import Template from "../render/Template";

export const renderTemplate = function (renderedApp, store) {
    const
        {renderdApp, updatedState} = templatePlaceHolder,
        regExp = new RegExp(Object.values(templatePlaceHolder).join("|"), "gi"),
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