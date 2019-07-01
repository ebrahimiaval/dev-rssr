import {toast} from "react-toastify";

/**
 * handel error 422 (authentication error handeler)
 * convert error object to string and then log it
 */
export const errorHandeler = {
    e422: (xhr) => {
        // error status is not 422
        if (xhr.status !== 422)
            return false;

        const error = JSON.parse(xhr.responseText);
        const kyes = Object.keys(error.errors);
        let errorList = '';

        kyes.forEach(function (key) {
            errorList += '\n' + error.errors[key].join(' , ');
        });

        console.log('Sever Error. ', error.message);

        toast.error('Sever Error. ' + errorList);

        // true mean error 422 happend
        return true;
    }
}


