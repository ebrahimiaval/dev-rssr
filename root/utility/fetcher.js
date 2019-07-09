import React, {Component} from 'react';
import {defaultState} from "../config/store";
import {getStore, setStore} from "trim-redux";


export const fecher = (TheComponent, stateName) => {
    return class FechProvider extends Component {

        static ftechParams = {};


        static  fetchData = TheComponent.fetchData;


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
            const defaultValue = defaultState[stateName];
            setStore(stateName, defaultValue);
        }





        // handel fetch data in first load (component mounting)
        // just when value of state is not default value
        componentDidMount() {
            const
                defaultValue = defaultState[stateName],
                nowValue = getStore(stateName);

            // fetch data when state has default value and mean
            // does not exist fetched data on server and need to fetch on client
            if (defaultValue === nowValue)
                this.fetchingData();
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
            // clear state to refetching data on next mounting
            this.resetState();
        }





        render() {
            return (
                <TheComponent {...this.props} setFtechParams={this.setFtechParams}/>
            );
        }
    }


}
