import {dataType} from "../../../../setup/utility/dataType";

export const isErrorData = function (data) {
    return dataType(data) === 'object' && data.error;
}