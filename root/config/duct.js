import {defaultState} from "./store";


/**
 * duct : SSR data transfer duct
 *
 */
export const duct = {
    // in none-redux server fetch storeState is equal
    // and in redux base server fetch contain updated State.
    // for more informaion see fetchDataProvider().
    storeState: {...defaultState},

    // default response status. can chenge to routeMap item status or change in fetchData()
    status: 200,

    // set in routeMap item detector. match object is equal with compoent match props posted by react-router-dom
    match: {},

    // value of RSSR_UPDATED_REDUX_STATES
    // change to real data when server fetch is props base and fetched done successfully
    // for more informaion see fetchDataProvider().
    fetchedData: null,

    // for more informaion see fetchDataProvider().
    updatedState: {}
}