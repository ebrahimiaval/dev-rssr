import {IS_SERVER} from "../../../root/config/constant";
import {serverFetcherHocProvider} from "./serverFetch";
import {clientFetcherHocProvider} from "./clientFetch";


/**
 * fecher is a HOC provider
 *
 * Fetcher is a HOC and wrap 'TheComponent'
 * to can handel fetching data actions of 'TheComponent'
 *
 * Fetcher in client contian all fetch actions
 * but in server just an interface
 * to pass duct to 'TheComponent' when type of fetch is props base
 * an in redux base is an empty component
 * (need empty component to avoid React 'compoenet not found' error)
 *
 * @param TheComponent: React Component
 * @returns {Fecher} :  Fetcher HOC
 */
export const fecher = (TheComponent) => {
    if (IS_SERVER)
        return serverFetcherHocProvider(TheComponent);
    else
        return clientFetcherHocProvider(TheComponent);
}
