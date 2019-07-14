import React, {Component} from 'react';
import {routeMap} from "../../../root/config/routeMap";
import {matchPath} from "react-router-dom";
import {isSet} from "../../../root/utility/checkSet";
import {getStore, setStore} from "trim-redux";
import {defaultState} from "../../../root/config/store";
import serialize from "serialize-javascript";


/**
 *  provider Fetcher HOC of client side
 *
 * Fetcher is a HOC and wrap 'TheComponent'
 * to can handel fetching data actions of 'TheComponent'.
 * Fetcher in client contian all fetch actions.
 *
 * @param TheComponent : React Compoentn
 * @returns {Fecher} : Fetcher HOC of client side
 */
export const clientFetcherHocProvider = function (TheComponent) {
    class Fecher extends Component {
        constructor(props) {
            super(props);

            // params of fetch(params) on the client
            this.ftechParams = {
                match: this.props.match
            };

            // // update this.ftechParams
            // this.setFtechParams = (params) => {
            //     this.ftechParams = {...this.ftechParams, ...params}
            // };

            // select matched routeMap item to get redux state name
            this.stateName = routeMap.find(route => matchPath(window.location.pathname, route)).redux;

            // in each time fetch can stand of Redux base OR Props Base
            // in Redux base fetched data pased from redux store states
            // and in props base pass from duct prop
            this.isReduxBase = isSet(this.stateName);
            this.isPropBase = !this.isReduxBase;//to improve UX


            if (this.isPropBase) {
                // create state to can update duct prop in route update in props base
                // state.duct { null || any}
                // if server fetch successfully {any}
                // and when server can not fetch data or does not SSR (SPA) is {null}
                this.state = {
                    duct: isSet(window.RSSR_DUCT) ? window.RSSR_DUCT : null
                }
                // Improvement RAM usage and fix SPA load conflict
                delete window.RSSR_DUCT;
            }

            this.firstFetch();
        }





        // fetch data and insert to redux or duct
        fetchProvider() {
            const withBase = this.isPropBase ? 'Props' : 'Redux';
            this.logger(withBase, 'client');

            TheComponent
                .fetch(this.ftechParams)
                .then((response) => {
                    if (this.isPropBase)
                        this.setState({fetchedData: response.data});
                    else
                        setStore(this.stateName, response.data)
                })
        }





        // in redux base reset state to default value
        // and in prop base
        resetDataHolder() {
            // if fetch mode is redux base (is prop base)
            if (this.isReduxBase) {
                const defaultValue = defaultState[this.stateName];
                setStore(this.stateName, defaultValue);
            } else {
                this.setState({fetchedData: null});
            }
        }





        // handel fetch data in first load (component mounting)
        // just when value of state is not default value
        firstFetch() {
            if (this.isReduxBase) {
                const
                    defaultValue = defaultState[this.stateName],
                    nowValue = getStore(this.stateName);

                // fetch data when state has default value and mean
                // does not exist fetched data on server and need to fetch on client
                if (serialize(defaultValue) === serialize(nowValue))
                    this.fetchProvider();
                else
                    this.logger('Redux', 'server');

            } else {
                if (this.state.fetchedData === null)
                    this.fetchProvider();
                else
                    this.logger('Props', 'server');

            }
        }



        logger(withBase, onThe) {
            console.log('fetch data of "' + this.ftechParams.match.url + '" as ' + withBase + 'Base on the ' + onThe + '.');
        }


        componentDidUpdate(prevProps) {
            // update when route update
            // exp: click on '/post/2' in mounted 'post 1'
            if (this.props.location.key !== prevProps.location.key) {
                // update match
                this.ftechParams.match = this.props.match;

                // to show loading
                this.resetDataHolder();

                // get data of new route
                this.fetchProvider();
            }
        }





        componentWillUnmount() {
            // then clear state to refetching data on next mounting
            this.resetDataHolder();
        }





        render() {
            // in props base fetchedData contain null OR any data and in redux base is undefined

            const props = {
                ...this.props,
                // setFtechParams: this.setFtechParams
            };

            if (this.isPropBase)
                props.duct = this.state.duct;

            return <TheComponent {...props} />;
        }
    }

    return Fecher;
}