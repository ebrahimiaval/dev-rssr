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
    const fetchType = als.get('fetchType');

    // when fetchType IS NOT 'REDUX_BASE' then state is undefined and createStore() use defaultState
    // when fetchType IS 'REDUX_BASE'  then state is mixed of defaultState and updatedState
    let states;
    if (fetchType === 'REDUX_BASE') {
        const updatedState = als.get('updatedState');
        states = {...defaultState, ...updatedState};
    }

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
        const
            status = als.get('status') || 500,
            response = renderIndexTemplate(renderedApp, helmet);

        res.status(status).send(response);
    }
    /** when <Redirect> rendered **/
    else {
        res.redirect(301, context.url);
    }
}





/**
 * make final response
 *
 * @param renderedApp {string}: string of DOM structure
 * @param helmet {object}: helmet property of renderedApp
 * @returns {string}: final response (mixed index template and rendered App)
 */
const renderIndexTemplate = function (renderedApp, helmet) {
    let template = <Index renderedApp={renderedApp} helmet={helmet}/>;

    template = ReactDOMServer.renderToString(template);

    template = '<!DOCTYPE html>' + template;

    return template;
}
