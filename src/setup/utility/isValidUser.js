import {getStore} from "trim-redux";
import {isSet} from "./checkSet";

export const isValidUser = () => {
    const localUser = getStore('localUser');

    if (!isSet(localUser))
        return false;

    return localUser.token !== null;
}
