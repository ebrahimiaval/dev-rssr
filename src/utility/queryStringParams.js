/**
 * queryStringParams
 */
export const queryStringParams = () => {
    // in server render
    if (typeof window === 'undefined') {
        // let query = global.serverReq.query || {};
        // //
        // // Object.keys(query).forEach(function(key){
        // //     query[key] = decodeURIComponent(query[key])
        // // });
        //
        // return query;
        return '';
    }


    let params = {};

    const queryString = window.location.search;

    if (queryString === '')
        return params;

    queryString.slice(1).split('&').forEach((item) => {
        const
            i = item.split('='),
            key = decodeURIComponent(i[0]),
            vlaue = (i[1] !== undefined) ? decodeURIComponent(i[1].replace(/(%20)/g, () => ' ')) : '';
        //
        params[key] = vlaue;
    });

    return params;
}

