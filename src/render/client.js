import React from 'react';
import {render} from "react-dom";
import {Provider} from "trim-redux";
import {Router} from 'react-router-dom';
// config
import "../config/jQueryPlugins";
import {browserHistory} from "../config/browserHistory";
import {clientCreateStore} from "../config/store";
import localStorageSetup from "../config/localStorage";
// Component
import App from "../App/App";



// define and manage localstorage variables
localStorageSetup();

const
    // create redux store with posted value from "UPDATED_REDUX_STATES"
    store = clientCreateStore(),
    // root element of application
    appWrap = document.getElementById('app-root');

// render in browser
render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <App/>
        </Router>
    </Provider>
), appWrap);
