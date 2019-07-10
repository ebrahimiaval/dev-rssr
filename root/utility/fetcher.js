import React, {Component} from 'react';
import {defaultState} from "../config/store";
import {getStore, setStore} from "trim-redux";
import {routeMap} from "../config/routeMap";
import {matchPath} from "react-router-dom";
import {IS_SERVER} from "../config/constant";
import {isNotSet, isSet} from "./checkSet";
import serialize from "serialize-javascript";
import {duct} from "../config/duct";



export const fecher = (TheComponent) => {
    // --------- for Server ------------//
    if (IS_SERVER)
        return class FechProvider extends Component {
            static fetchData = TheComponent.fetchData;

            render() {
                // in server fetch provider just handle props base (get fetchedData from duct and pass to component as prop)
                // redux base server fetch data handled in fetchDataProvider() server action
                const {fetchedData} = duct;
                return <TheComponent {...this.props} fetchedData={fetchedData} setFtechParams={() => ''}/>;
            }
        }


    // --------- for client ------------//
    return class FechProvider extends Component {

        static ftechParams = {};

        constructor(props) {
            super(props);

            // select matched routeMap item to get redux param
            this.stateName = routeMap.find(route => matchPath(window.location.pathname, route)).redux;

            // in each time fetch can stand of Redux base OR Props Base
            // in Redux base fetched data pased from redux store states
            // and in props base pass from fetchedData prop
            this.isReduxBase = isSet(this.stateName);
            this.isPropsBase = !this.isReduxBase;//to improve UX

            // create state to can update fetchedData prop in route update
            if (this.isPropsBase) {
                this.state = {
                    fetchedData: window.RSSR_FETCHED_DATA
                }
                // Improvement RAM usage
                delete window.RSSR_FETCHED_DATA;
            }
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





        // in redux base reset state to default value
        // and in prop base
        resetDataHolder() {
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
                this.resetDataHolder();

                // get data of new route
                this.fetchingData();
            }
        }





        componentWillUnmount() {
            // then clear state to refetching data on next mounting
            this.resetDataHolder();
        }





        render() {
            const fetchedData = this.isPropsBase ? this.state.fetchedData : undefined;
            return (
                <TheComponent {...this.props} fetchedData={fetchedData} setFtechParams={this.setFtechParams}/>
            );
        }
    }


}
