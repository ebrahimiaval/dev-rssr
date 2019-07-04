import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {matchPath, StaticRouter} from "react-router-dom";
import {Provider} from "react-redux";
// config
import {createStore, defaultState} from "./config/store";
import {routeMap} from "./config/routeMap";
// utility
import {errorLogger} from "./utility/errorLogger";
import {isSet} from "./utility/isSet";
// HTML template
import TemplateE500 from './config/TemplateE500';
// component
import App from './App/App';
import {renderMainTemplate} from "./utility/renderMainTemplate";





export default function serverRenderer() {
    return (req, res, next) => {
        // start proccess timer
        let proccessTimeStart = Date.now();

        const errorReporter = function (error) {
            errorLogger('server.js', proccessTimeStart, error);

            let template = <TemplateE500 error={error}/>;

            template = ReactDOMServer.renderToString(template);

            template = '<!DOCTYPE html>' + template;

            // ERROR 500 - when occurs an error during process
            res.status(500).send(template);
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
                        res.status(status).send(renderMainTemplate(renderedApp, store)); // usual app render
                })
                .catch(errorReporter);
        } catch (error) {
            errorReporter(error);
        }
    };
}
