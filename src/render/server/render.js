import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import als from "async-local-storage";
import {Helmet} from "react-helmet";
import {Provider} from "react-redux";
// config
import {createStore, defaultState} from "../../setup/store";
// component
import App from "../../App/App";
// template
import Index from "./Index";
import {errorLogger} from "../../setup/utility/errorLogger";
import ProcessError from "./template/ProcessError";



/**
 * render app on the server and send response as HTML to client
 */
export const render = function (error, req, res, timerStart) {
    let app;
    const context = {};

    if (!error) {
        const
            fetch = als.get('fetch'),
            updatedState = als.get('updatedState'),
            states = !!fetch && !!updatedState ? {...defaultState, ...updatedState} : undefined; // when passed states is undefined then createStore use defaultState

        const store = createStore(states);
        app = (
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
        );
    }
    /** render ERROR **/
    else {
        // log to console
        errorLogger('server.js', timerStart, error, false, req);

        app = <ProcessError error={error}/>;
    }

    const renderedApp = ReactDOMServer.renderToString(app);
    const helmet = Helmet.renderStatic();

    if (!context.url) {
        const status = !error ? (als.get('status') || 500) : 500;

        // make HTML response
        let response = <Index renderedApp={renderedApp} helmet={helmet} error={error}/>;
        response = ReactDOMServer.renderToString(response);
        response = '<!DOCTYPE html>' + response;

        res.status(status).send(response);
    } else {
        // when <Redirect> rendered
        res.redirect(301, context.url);
    }
}
