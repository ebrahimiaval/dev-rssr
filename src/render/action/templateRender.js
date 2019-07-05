import React from 'react';
import {Helmet} from "react-helmet";
import ReactDOMServer from "react-dom/server";
import {pickUpdatedStates} from "../../utility/pickUpdatedStates";
import Template from "../template/Index";


export const templateRender = function (renderedApp, store) {
    const updatedState = pickUpdatedStates(store);

    let template = <Template helmet={Helmet.renderStatic()} updatedState={updatedState} renderedApp={renderedApp}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    return template;
}