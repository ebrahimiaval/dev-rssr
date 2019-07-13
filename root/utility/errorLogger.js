/**
 * error handler
 * log errors in console
 */
export const errorLogger = (title, proccessTime, error) => {
    let errorMessage, type;
    // = (typeof error.response !== 'undefined') ?  : error
    if (error.response) {
        errorMessage = error.response.data;
        type = "response error";//server find error and tell to front like status 402
    } else if (error.request) {
        errorMessage = error.message;
        type = "request error"; // like error 500 or request timeouted
    } else if (error.message) {
        errorMessage = error.stack || error.message || JSON.stringify(error).slice(0, 600);
        type = "setup error"; // have error in code like one variable is undefined
    } else {
        errorMessage = JSON.stringify(error).slice(0, 600);
        type = "public error";
    }

    console.log(`${type} in ${title} at ${Date.now() - proccessTime} ms.\n`, errorMessage);
}

