import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "../../config/store";
import {templateRender} from "./templateRender";
import App from "../../App/App";

export const serverRender = function (storeState, req, res, status) {
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
    else
        res.status(status).send(templateRender(renderedApp, store)); // usual app render
}