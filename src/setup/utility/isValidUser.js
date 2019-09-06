import {getStore} from "trim-redux";
import {isSet} from "./checkSet";

/**
 * check user in the past loged in or not
 *
 * @returns {boolean}
 */
export const isValidUser = () => {
    const localUser = getStore('localUser');

    if (!isSet(localUser))
        return false;

    return localUser.token !== null;
}
