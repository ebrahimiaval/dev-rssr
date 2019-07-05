import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import {Helmet} from "react-helmet";
import {Provider} from "react-redux";
// config
import {createStore} from "../config/store";
// utility
import {pickUpdatedStates} from "../utility/pickUpdatedStates";
// component
import App from "../../src/App/App";
import Index from "../template/Index";





const renderIndexTemplate = function (renderedApp, updatedState) {
    let template = <Index renderedApp={renderedApp} updatedState={updatedState} helmet={Helmet.renderStatic()}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    return template;
}





export const successfulResponse = function (req, res, status, storeState) {
    const
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
        const updatedState = pickUpdatedStates(store);
        res.status(status).send(renderIndexTemplate(renderedApp, updatedState)); // usual app render
    }
}