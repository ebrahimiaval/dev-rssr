import {dataType} from "./dataType";

export const isErrorData = function (data) {
    return dataType(data) === 'object' && data.error;
}