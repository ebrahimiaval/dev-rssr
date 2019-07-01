import React from 'react';
import {render} from "react-dom";
import {Provider} from "trim-redux";
import {Router} from 'react-router-dom';
// config
import {browserHistory} from "../config/browserHistory";
import {clientCreateStore} from "../config/store";
import localStorageSetup from "../config/localStorage";
// Component
import App from "../App/App";
// module
import 'bootstrap-v4-rtl';





// define and manage localstorage variables
localStorageSetup();

// create redux store with posted value from "__rssrـstatesــ"
const
    store = clientCreateStore(),
    appWrap = document.getElementById('app-root');

// render DOM in browser
render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <App/>
        </Router>
    </Provider>
), appWrap);
