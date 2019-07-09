import React, {Component} from 'react';
import {defaultState} from "../config/store";
import {getStore, setStore} from "trim-redux";
import {routeMap} from "../config/routeMap";
import {matchPath} from "react-router-dom";
import {IS_SERVER} from "../config/constant";
import {isNotSet, isSet} from "./checkSet";
import serialize from "serialize-javascript";


export const fecher = (TheComponent) => {
    // pass clean component on server
    if (IS_SERVER)
        return class FechProvider extends Component {

            static fetchData = TheComponent.fetchData;

            render() {
                return (
                    // use Context to pass fetchedData ti it
                    <TheComponent {...this.props} fetchedData={''} setFtechParams={this.setFtechParams}/>
                );
            }
        }


    return class FechProvider extends Component {

        static ftechParams = {};
        static fetchData = TheComponent.fetchData;

        constructor(props) {
            super(props);

            // select matched routeMap item and get redux param
            this.stateName = routeMap.find(route => matchPath(window.location.pathname, route)).redux;
            this.isReduxBase = isSet(this.stateName);

            this.state = {
                fetchedData: this.isReduxBase ? undefined : window.RSSR_FETCHED_DATA
            }

            // delete window.RSSR_FETCHED_DATA;

            console.log(window.RSSR_FETCHED_DATA);
            console.log(this.state.fetchedData);
        }




        // Parameters that Client wants to send to FetchData method
        setFtechParams(ftechParams) {
            FechProvider.ftechParams = ftechParams;
        }





        // fetch data and insert to redux
        fetchingData() {
            TheComponent.fetchData(FechProvider.ftechParams)
                .then(function (response) {
                    // console.log(response);
                    setStore({home: response.data})
                })
        }





        // reset state to default value
        resetState() {
            // if fetch mode is redux base (is prop base)
            if (!this.isReduxBase)
                return;

            const defaultValue = defaultState[this.stateName];
            setStore(this.stateName, defaultValue);
        }





        // handel fetch data in first load (component mounting)
        // just when value of state is not default value
        componentDidMount() {
            if (this.isReduxBase) {
                const
                    defaultValue = defaultState[this.stateName],
                    nowValue = getStore(this.stateName);

                // fetch data when state has default value and mean
                // does not exist fetched data on server and need to fetch on client
                if (serialize(defaultValue) === serialize(nowValue))
                    this.fetchingData();
            } else {
                if (isNotSet(this.state.fetchedData))
                    this.fetchingData();
            }
        }





        componentDidUpdate(prevProps) {
            // update when route update
            // exp: click on '/post/2' in mounted 'post 1'
            if (this.props.location.key !== prevProps.location.key) {
                // to show loading
                this.resetState();

                // get data of new route
                this.fetchingData();
            }
        }





        componentWillUnmount() {
            // then clear state to refetching data on next mounting
            this.resetState();
        }





        render() {
            return (
                <TheComponent {...this.props} fetchedData={this.state.fetchedData} setFtechParams={this.setFtechParams}/>
            );
        }
    }


}
