import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import {Helmet} from "react-helmet";
import {Provider} from "react-redux";
// config
import {createStore} from "../../config/store";
// utility
// component
import App from "../../../src/App/App";
import Index from "../../template";
import {duct} from "../../config/duct";





const renderIndexTemplate = function (renderedApp) {
    const
        {updatedState, fetchedData, status} = duct,
        props = {
            renderedApp: renderedApp,
            updatedState: updatedState,
            fetchedData: fetchedData,
            helmet: Helmet.renderStatic(),
            status: status
        };
    let template = <Index {...props}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    return template;
}





export const successfulResponse = function () {
    const
        {req, res, status, storeState} = duct,
        store = createStore(storeState),
        context = {},
        app = (
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
        ),
        renderedApp = ReactDOMServer.renderToString(app);

    if (context.url)
        res.redirect(301, context.url); // if <Redirect> was rendered
    else {
        res.status(status).send(renderIndexTemplate(renderedApp)); // usual app render
    }
}