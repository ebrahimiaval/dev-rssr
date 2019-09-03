export const responseValidation = function (response) {
    // check data and status exist
    if (!response.hasOwnProperty('data') || !response.hasOwnProperty('status'))
        throw new Error('⛔ invalid fetch() response. "data" and "status" is required. pleace check axios returns.');

    // check status type
    if (typeof response.status !== "number")
        throw new Error('⛔ invalid fetch() response. value of "status" is not number! pleace check axios returns.');

    // check status valid range
    if (response.status < 100 || response.status >= 600)
        console.warn('📌 value of "status" is not in valid range (1** to 5**). status is ' + response.status)

}
