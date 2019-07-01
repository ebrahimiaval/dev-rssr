/**
 * convert object to query string params
 * @param obj {object}: like: {a:1, b2}
 * @returns {string}: like: a=1&b=2
 */
export const objectToQueryString = function (obj) {
    const str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};

