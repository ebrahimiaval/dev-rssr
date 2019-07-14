import React from "react";

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
export const serverFetcherHocProvider = function (TheComponent) {
    const Fecher = function (thisProps) {
        // handle props base (redux base handeled with Redux)
        const
            als = require("async-local-storage"),
            props = {...thisProps};

        if (als.get('isPropBase') === true)
            props.duct = als.get('duct');

        // props.setFtechParams = setFtechParams={() => ''}

        return <TheComponent {...props} />;
    }

    // get fetch() to can access to it in  server fetchProvider()
    Fecher.fetch = TheComponent.fetch;

    return Fecher;
}