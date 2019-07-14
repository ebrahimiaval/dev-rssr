import React from "react";
import {dataType} from "../../../root/utility/dataType";
import DefaultErrors from "../DefaultErrors/DefaultErrors";
import {connect} from "trim-redux";

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
            const duct = als.get('duct');

            if (dataType(duct) === 'object' && duct.error)
                return <DefaultErrors data={duct}/>

            props.duct = duct;
        }

        /** Redux Base **/
        else if (fetchType === 'REDUX_BASE') {
            const
                stateName = als.get('stateName'),
                data = als.get('updatedState')[stateName];

            if (dataType(data) === 'object' && data.error)
                return <DefaultErrors data={data}/>

            // connect TheComponent to redux
            const mstp = s => ({[stateName]: s[stateName]});
            TheComponent = connect(mstp)(TheComponent);
        }

        return <TheComponent {...props} />;
    }

    // to can access in server fetchProvider()
    Fecher.fetch = TheComponent.fetch;
    Fecher.redux = TheComponent.redux;

    return Fecher;
}