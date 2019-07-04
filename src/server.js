import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter, matchPath} from "react-router-dom";
import {Helmet} from "react-helmet";
import {Provider} from "react-redux";
// config
import {createStore, defaultState} from "./config/store";
import {routeMap} from "./config/routeMap";
// utility
import {errorLogger} from "./utility/errorLogger";
import {isSet} from "./utility/isSet";
import {htmlMinify} from "./utility/htmlMinify";
// HTML template
import mainTemplate from './config/template.main';
import e500Template from './config/template.error500';
// component
import App from './App/App';





export default function serverRenderer() {
    return (req, res) => {
        // start proccess timer
        let proccessTimeStart = Date.now();

        const errorReporter = function (error) {
            errorLogger('server.js', proccessTimeStart, error);

            // ERROR 500 - when occurs an error during process
            res.status(500).send(e500Template(error));
        }

        try {
            let storeState = {...defaultState};

            // default status code
            let status = 200;

            //---------- fetch api data and set status code -------------- //
            // matchPath can not know Query string Because of this we split and remvoe Query strin.
            // EXP: '/search?q=watch' -> '/search'
            const reqUrl = req.url.split('?')[0];

            // find route item mached with reqUrl
            // route item is like this: { path: url.amazonSearch(), component: AmazonSearch, exact: true}
            const currentRoute = routeMap.find(route => matchPath(reqUrl, route));

            // fetch data of component from server when have component and component have fetchData property
            // fetch reuirement data of matched component

            const initialData = isSet(currentRoute.component) ?
                currentRoute.component.fetchData && currentRoute.component.fetchData({req, storeState})
                :
                true;

            // set response status code if route have status prop (default is 200)
            // it is useful for 404 page
            if (currentRoute.status)
                status = currentRoute.status;

            /**
             * render template after API fetched
             */
            Promise.resolve(initialData)
                .then(() => {
                    //create redux store
                    const store = createStore(storeState);

                    const context = {};

                    const jsx = (
                        <Provider store={store}>
                            <StaticRouter location={req.url} context={context}>
                                <App/>
                            </StaticRouter>
                        </Provider>
                    );

                    // body html
                    const markup = ReactDOMServer.renderToString(jsx);

                    if (context.url) {
                        // Somewhere a `<Redirect>` was rendered
                        // console.log("redirect from " + req.path + ' to ' + context.url);
                        res.redirect(301, context.url);
                    } else {
                        // remove unchanged items from redux store state
                        let nowState = store.getState();
                        for (let key in defaultState) {
                            // skip loop if the property is from prototype
                            if (!defaultState.hasOwnProperty(key))
                                continue;

                            const
                                lastValue = JSON.stringify(nowState[key]),
                                nowValue = JSON.stringify(defaultState[key]);

                            if (lastValue === nowValue)
                                delete nowState[key];
                        }

                        // return view
                        let template = mainTemplate({
                            markup: markup,
                            helmet: Helmet.renderStatic(), // meta tags
                            storeState: nowState // redux store state
                        });

                        // minify response in production mode
                        if (process.env.NODE_ENV === 'production')
                            template = htmlMinify(template);

                        res.status(status).send(template);
                    }
                })
                .catch(errorReporter);
        } catch (error) {
            errorReporter(error);
        }
    };
}
