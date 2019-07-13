import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import {Helmet} from "react-helmet";
import als from "async-local-storage";
import {Provider} from "react-redux";
// config
import {createStore, defaultState} from "../../config/store";
// component
import App from "../../../src/App/App";
// template
import Index from "../../template/Index";





const renderIndexTemplate = function (renderedApp, updatedState) {
    const
        props = {
            renderedApp: renderedApp,
            updatedState: updatedState,
            duct: als.get('duct'),
            helmet: Helmet.renderStatic()
        };
    let template = <Index {...props}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    return template;
}





export const successfulResponse = function () {
    const
        res = als.get('res'),
        reqUrl = als.get('reqUrl'),
        status = als.get('status') || 500,
        updatedState = als.get('updatedState'),
        //
        context = {},
        store = createStore({...defaultState, ...updatedState}),
        app = (
            <Provider store={store}>
                <StaticRouter location={reqUrl} context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
        ),
        renderedApp = ReactDOMServer.renderToString(app);



    if (context.url) {
        // when <Redirect> rendered
        res.redirect(301, context.url);
    } else {
        // usual app render
        res.status(status).send(renderIndexTemplate(renderedApp, updatedState));
    }
}