import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {matchPath, StaticRouter} from "react-router-dom";
import {Provider} from "react-redux";
// config
import {createStore, defaultState} from "../config/store";
import {routeMap} from "../config/routeMap";
// utility
import {renderTemplate} from "../utility/renderTemplate";
import {serverError} from "../utility/serverError";
// component
import App from '../App/App';


export default function serverRenderer() {
    return (req, res, next) => {
        // start proccess timer
        const proccessTimeStart = Date.now();

        try {
            let storeState = {...defaultState};

            // default status code
            let status = 200;

            // matchPath can not know Query string Because of this we split and remvoe Query strin.
            // EXP: '/search?q=watch' -> '/search'
            const reqUrl = req.url.split('?')[0];

            // find route item mached with reqUrl
            // route item is like this: { path: url.amazonSearch(), component: AmazonSearch, exact: true}
            const currentRoute = routeMap.find(route => matchPath(reqUrl, route));

            // fetch data from server
            let initialData = true;
            if (currentRoute.hasOwnProperty('component'))
                if (currentRoute.component.hasOwnProperty('fetchData'))
                    initialData = currentRoute.component.fetchData({req, storeState});

            // set response status code if route have status prop (default is 200)
            // it is useful for 404 page
            if (currentRoute.status)
                status = currentRoute.status;

            /**
             * render template when API resolved
             */
            Promise.resolve(initialData)
                .then(() => {
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
                        res.status(status).send(renderTemplate(renderedApp, store)); // usual app render
                })
                .catch((error) => {
                    serverError(res, error, proccessTimeStart);
                });
        } catch (error) {
            serverError(res, error, proccessTimeStart);
        }
    };
}
