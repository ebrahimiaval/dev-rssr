import React from 'react';
import {Provider} from "trim-redux";
import {Router} from "react-router-dom";
import reactDom from "react-dom";
// config
import {clientCreateStore} from "../../config/store";
import {browserHistory} from "../../config/browserHistory";
// component
import App from "../../../src/App/App";

export const render = function () {
    const
        // create redux store with posted value from "RSSR_UPDATED_REDUX_STATES"
        store = clientCreateStore(),
        // root element of application
        appWrap = document.getElementById('app-root'),
        // clinet app
        app = (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <App/>
                </Router>
            </Provider>
        );

    // render in browser
    reactDom.render(app, appWrap);
}