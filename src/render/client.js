import React from 'react';
import {Provider} from "trim-redux";
import {Router} from "react-router-dom";
import reactDom from "react-dom";
import {clientCreateStore} from "../setup/store";
import {browserHistory} from "../setup/browserHistory";
import localStorageSetup from "../setup/localStorage";
import App from "../App/App";
// jQuery
import 'bootstrap-v4-rtl';
import "../setup/utility/samplejQueryPlugin";
// style
import 'react-toastify/dist/ReactToastify.min.css';
import "../setup/style/bootstrap/bootstrap-rtl.scss";
import "../setup/style/animate.scss";



// define public structur and varibales
localStorageSetup();


// create redux store with posted value from "RSSR_UPDATED_REDUX_STATES"
const store = clientCreateStore();


// root element of application
const appWrap = document.getElementById('app-root');


// clinet app
const app = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <App/>
        </Router>
    </Provider>
);



// render in browser
reactDom.render(app, appWrap);