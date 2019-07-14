import React, {Component} from 'react';
import {isSet} from "../../../root/utility/checkSet";
import {connect, setStore} from "trim-redux";
import {defaultState} from "../../../root/config/store";
import {clientQueryString} from "../../../root/utility/clientQueryString";
import {DUCT_DEFAULT_VALUE} from "../../../root/config/constant";


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
export const clientFetcher = function (TheComponent) {
    class Fecher extends Component {
        constructor(props) {
            super(props);

            // params passed to fetch() on the client
            this.ftechParams = {
                match: this.props.match,
                query: clientQueryString()
            };
            this.stateName = TheComponent.redux;
            this.isReduxBase = isSet(this.stateName);
            this.isPropBase = !this.isReduxBase;

            let dataExist;

            /** Prop Base **/
            if (this.isPropBase) {
                dataExist = isSet(window.RSSR_DUCT);

                this.state = {
                    duct: dataExist ? window.RSSR_DUCT : DUCT_DEFAULT_VALUE
                }

                if (dataExist)
                    delete window.RSSR_DUCT;
            }

            /** Redux Base **/
            else {
                dataExist = isSet(window.RSSR_UPDATED_REDUX_STATES);

                if (dataExist)
                    delete window.RSSR_UPDATED_REDUX_STATES;
            }

            if (!dataExist)
                this.fetchProvider();
            else
                this.logger('server');
        }





        // fetch data and insert to redux or duct
        fetchProvider() {

            this.logger('client');

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





        logger(onThe) {
            const withBase = this.isPropBase ? 'Props' : 'Redux';
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

            if (this.isPropBase){
                props.duct = this.state.duct;
            }
            else {
                const mstp = state => ({
                    [this.stateName]: state[this.stateName]
                });
                TheComponent = connect(mstp)(TheComponent);
            }

            return <TheComponent {...props}/>;
        }
    }

    return Fecher;
}