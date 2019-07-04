import React from 'react';
import Template from "../config/Template";
import {Helmet} from "react-helmet";
import {pickUpdatedStates} from "./pickUpdatedStates";
import ReactDOMServer from "react-dom/server";

export const renderMainTemplate = function (renderedApp, store) {
    let template = <Template helmet={Helmet.renderStatic()} updatedStates={pickUpdatedStates(store)}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    // inject rendered app in server to template
    template = template.replace('__renderedApp__', renderedApp);

    return template;
}