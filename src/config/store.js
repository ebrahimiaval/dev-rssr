import {createStore as createStoreProvider, compose, applyMiddleware} from 'trim-redux';
import thunk from 'redux-thunk';
import {IS_BROWSER} from "./constant";
// utility





/**
 * Redux states
 *
 * each item in this list is a one state in redux store
 * and value of this is default value
 */
export const defaultState = {
    localUser: {updated: false, token: null},
    home: []
}





/**
 * Redux-DevTools
 *
 * define parameters of browser "Redux-DevTools" plugin in development mode
 *  - chrome: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
 *  - firefox: https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/
 */
let composeEnhancer = compose;
//
if (JSON.parse(process.env.RSSR_REDUX_DEV_TOOLS) && IS_BROWSER)
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;





/**
 * redux thunk
 */
composeEnhancer = composeEnhancer(applyMiddleware(thunk));





/**
 * create Redux Store
 *
 * cearte store with defaultState
 * but in server rendering each state changed (exp: data of home page fetched in server and set to home state)
 * then store create with changed state (in top exp, home state has real data but other state have default data or empty)
 *
 * @param state <object>: object of states with default value
 * @returns {any} : redux store object
 */
export const createStore = (state = defaultState) => createStoreProvider(state, composeEnhancer);





/**
 * create store with combine server feched data and default store states
 * @returns {any} : redux store object
 */
export const clientCreateStore = function () {
    const combindedState = {
        ...defaultState,
        ...window.UPDATED_REDUX_STATES
    };

    // fix RAM usage
    delete window.UPDATED_REDUX_STATES;

    return createStore(combindedState);
}
