import {defaultState} from "../config/store";
import serialize from 'serialize-javascript';

// remove unchanged items of redux store state
export const pickUpdatedStates = function (store) {
    let nowState = store.getState();

    for (let key in defaultState) {
        if (!defaultState.hasOwnProperty(key))
            continue;
        const
            lastValue = serialize(nowState[key]),
            nowValue = serialize(defaultState[key]);

        if (lastValue === nowValue)
            delete nowState[key];
    }

    return nowState;
}
