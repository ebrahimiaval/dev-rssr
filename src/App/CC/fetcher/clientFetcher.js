import React, {Component} from 'react';
import {connect, setStore} from "trim-redux";
import {defaultState} from "../../../setup/store";
import {isSet} from "../../../setup/utility/checkSet";
import {clientQueryString} from "../../../setup/utility/clientQueryString";
import {DUCT_DEFAULT_VALUE} from "../../../setup/constant";
import {isErrorData} from "./CA/isErrorData";
import DefaultErrors from "./CC/DefaultErrors";
import {responseValidation} from "../../../setup/utility/responseValidation";


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

    const stateName = TheComponent.redux;

    class Fecher extends Component {
        constructor(props) {
            super(props);

            this.erroredData = false;

            // params passed to fetch() on the client
            this.ftechParams = {
                match: this.props.match,
                query: clientQueryString()
            };

            if (JSON.stringify(this.props[stateName]) === JSON.stringify(defaultState[stateName]))
                this.fetchProvider();
            else
                this.logger(false);
        }





        // fetch data and insert to redux or duct
        fetchProvider() {
            this.logger(true);

            TheComponent
                .fetch(this.ftechParams)
                .then((response) => {
                    // excute 'throw new Error' if response is not valid
                    responseValidation(response);

                    if (isErrorData(response.data))
                        this.erroredData = response.data;
                    else
                        this.erroredData = false; // reset last error

                    setStore(stateName, response.data);
                })
        }





        logger(inClient) {
            console.info('💬 fetch data of ' + this.ftechParams.match.url + ' in ' + (inClient ? 'browser' : 'server'));
        }





        resetDataHolder() {
            const defaultValue = defaultState[stateName];
            setStore(stateName, defaultValue);
        }





        /**
         *  update when route update. for example click on like '/post/2' in mounted component with path '/post/1'
         */
        componentDidUpdate(prevProps) {
            if (this.props.location.key === prevProps.location.key)
                return;

            // update match
            this.ftechParams.match = this.props.match;

            // to show loading
            this.resetDataHolder();

            // get data of new route
            this.fetchProvider();

        }





        componentWillUnmount() {
            // then clear state to refetching data on next mounting
            this.resetDataHolder();
        }





        render() {
            if (this.erroredData)
                return <DefaultErrors data={this.erroredData}/>

            return <TheComponent {...this.props}/>;
        }
    }


    const mstp = state => ({
        [stateName]: state[stateName]
    });

    return connect(mstp)(Fecher);
}