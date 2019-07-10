import {defaultState} from "./store";


/**
 * duct : SSR data transfer duct
 *
 * NOTICE: updatedState and fetchedData can be params of duct
 * but when have server fetch data.for more informaion see fetchDataProvider().
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
}