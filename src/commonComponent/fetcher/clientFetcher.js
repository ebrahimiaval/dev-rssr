import React, {Component} from 'react';
import {isSet} from "../../../root/utility/checkSet";
import {connect, setStore} from "trim-redux";
import {defaultState} from "../../../root/config/store";
import {clientQueryString} from "../../../root/utility/clientQueryString";
import {DUCT_DEFAULT_VALUE} from "../../../root/config/constant";
import DefaultErrors from "../DefaultErrors/DefaultErrors";
import {isErrorData} from "../../../root/utility/isErrorData";


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

                if (dataExist) {
                    if (isErrorData(this.state.duct))
                        this.erroredData = this.state.duct;

                    delete window.RSSR_DUCT;
                }
            }

            /** Redux Base **/
            else {
                dataExist = isSet(window.RSSR_UPDATED_REDUX_STATES);

                if (dataExist) {
                    const data = window.RSSR_UPDATED_REDUX_STATES[this.stateName];

                    if (isErrorData(data))
                        this.erroredData = data;

                    delete window.RSSR_UPDATED_REDUX_STATES;
                }
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
                    if (!response.hasOwnProperty('data'))
                        throw new Error('⛔ invalid fetch() response. "data" is required. pleace check axios returns.\n');

                    if (isErrorData(response.data))
                        this.erroredData = response.data;

                    if (this.isPropBase)
                        this.setState({fetchedData: response.data});
                    else
                        setStore(this.stateName, response.data)
                })
        }





        logger(side) {
            const withBase = this.isPropBase ? 'Props' : 'Redux';
            console.info('💬 fetch data of "' + this.ftechParams.match.url + '" as ' + withBase + 'Base on the ' + side + '.');
        }





        resetDataHolder() {
            if (this.isPropBase) {
                this.setState({fetchedData: DUCT_DEFAULT_VALUE});
            } else {
                const defaultValue = defaultState[this.stateName];
                setStore(this.stateName, defaultValue);
            }
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
            if (this.erroredData)
                return <DefaultErrors data={this.erroredData}/>

            const props = {...this.props};

            if (this.isPropBase) {
                props.duct = this.state.duct;
            } else {

            }

            return <TheComponent {...props}/>;
        }
    }


    const mstp = state => ({
        [stateName]: state[stateName]
    });

    return connect(mstp)(Fecher);
}