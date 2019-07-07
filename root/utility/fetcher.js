import React, {Component} from 'react';
import {defaultState} from "../config/store";
import {getStore, setStore} from "trim-redux";


export const fecher = (TheComponent, stateName) => {
    return class FechProvider extends Component {

        static ftechParams = {};





        setFtechParams(ftechParams) {
            FechProvider.ftechParams = ftechParams;
        }





        resetState() {
            // insert default value to state
            const defaultValue = defaultState[stateName];
            setStore(stateName, defaultValue);
        }





        componentDidMount() {
            // first load fetch data
            // if value of state is not default value
            const
                defaultValue = defaultState[stateName],
                nowValue = getStore(stateName);

            if (defaultValue === nowValue) {
                TheComponent.fetchData(FechProvider.ftechParams);
            }
        }





        // shouldComponentUpdate(nextProps, nextState, nextContext) {
        //
        //     if (this.props.location.key !== nextProps.location.key) {
        //
        //         this.resetState();
        //
        //         console.log('do update');
        //
        //         TheComponent.fetchData(FechProvider.ftechParams);
        //     }
        //
        //     return true;
        // }


        componentDidUpdate(prevProps){
            if (this.props.location.key !== prevProps.location.key) {
                this.resetState();
                TheComponent.fetchData(FechProvider.ftechParams);
            }
        }




        componentWillUnmount() {
            this.resetState();
        }





        render() {
            return (
                <TheComponent {...this.props} setFtechParams={this.setFtechParams}/>
            );
        }
    }
}
