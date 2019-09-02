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
import Index from "../template";



/**
 * render app on the server
 *
 * @param req {object}: express req object
 * @param res {object}: express res object
 */
export const render = function (req, res) {
    const
        fetch = als.get('fetch'),
        updatedState = als.get('updatedState'),
        states = !!fetch && !!updatedState ? {...defaultState, ...updatedState} : undefined; // when passed states is undefined then createStore use defaultState

    // render app to string and get renderedApp and helmet properies
    // renderedApp is string of DOM structure
    const
        context = {},
        store = createStore(states),
        app = (
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
        ),
        renderedApp = ReactDOMServer.renderToString(app),
        helmet = Helmet.renderStatic();

    /** response of most requests **/
    if (!context.url) {
        const status = als.get('status') || 500;

        // make HTML response
        let response = <Index renderedApp={renderedApp} helmet={helmet}/>;
        response = ReactDOMServer.renderToString(response);
        response = '<!DOCTYPE html>' + response;

        res.status(status).send(response);
    }
    /** when <Redirect> rendered **/
    else {
        res.redirect(301, context.url);
    }
}
