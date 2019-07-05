import React from 'react';
import {render} from "react-dom";
import {Provider} from "trim-redux";
import {Router} from 'react-router-dom';
// config
import {browserHistory} from "./config/browserHistory";
import {clientCreateStore} from "./config/store";
import localStorageSetup from "./config/localStorage";
// public jQuery plugins
import 'bootstrap-v4-rtl';
import "./utility/samplejQueryPlugin";
// vendor styles
import "./vendorStyle/bootstrap/bootstrap-rtl.scss";
import "./vendorStyle/animate.scss";
import 'react-toastify/dist/ReactToastify.min.css';
// Component
import App from "../src/App/App";



// define and manage localstorage variables
localStorageSetup();

const
    // create redux store with posted value from "RSSR_UPDATED_REDUX_STATES"
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
