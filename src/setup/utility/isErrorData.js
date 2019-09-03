import {dataType} from "./dataType";

export const isErrorData = (data) => dataType(data) === 'object' && data.error
