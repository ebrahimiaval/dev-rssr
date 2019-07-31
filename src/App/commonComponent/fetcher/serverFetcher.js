import React from "react";
import DefaultErrors from "../DefaultErrors/DefaultErrors";
import {connect} from "trim-redux";
import {isErrorData} from "../../../setup/utility/isErrorData";

/**
 *  provider Fetcher HOC of server side
 *
 * Fetcher HOC in server just an interface
 * to pass duct to 'TheComponent' when type of fetch is props base
 * an in redux base is an empty component
 * (need empty component to avoid React 'compoenet not found' error)
 *
 * @param TheComponent : React Compoentn
 * @returns {Fecher} : Fetcher HOC of server side
 */
export const serverFetcher = function (TheComponent) {

    const als = require("async-local-storage");


    let Fecher = function (theProps) {
        // handle props base (redux base handeled with Redux)
        const
            props = {...theProps},
            fetchType = als.get('fetchType');

        /** Prop Base **/
        if (fetchType === 'PROP_BASE') {
            const data = als.get('duct');

            if (isErrorData(data))
                return <DefaultErrors data={data}/>

            props.duct = data;
        }

        /** Redux Base **/
        else if (fetchType === 'REDUX_BASE') {
            const
                stateName = als.get('stateName'),
                data = als.get('updatedState')[stateName];

            if (isErrorData(data))
                return <DefaultErrors data={data}/>

            // connect TheComponent to redux
            const mstp = state => ({
                [stateName]: state[stateName]
            });
            TheComponent = connect(mstp)(TheComponent);
        }

        return <TheComponent {...props} />;
    }

    // clone static props
    // Object.getOwnPropertyNames(TheComponent).forEach(function (key) {
    //     if (!Fecher.hasOwnProperty(key))
    //         Fecher[key] = TheComponent[key];
    // });

    // // to can access in server fetchProvider()
    // if (TheComponent.hasOwnProperty('fetch'))
    //     Fecher.fetch = TheComponent.fetch;
    //
    // if (TheComponent.hasOwnProperty('redux'))
    //     Fecher.redux = TheComponent.redux;

    return Fecher;
}