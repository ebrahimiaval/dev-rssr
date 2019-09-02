import als from "async-local-storage";


// fetch data of component from server
export const fetchProvider = async function (req) {
    // fetch() of component of matched route item
    const fetch = als.get('fetch');

    // when component has not fetch() then fetch is undefined and fetchType is 'WITH_OUT_FETCH'
    if (!fetch)
        return true;


    // pass to fetch() as params
    const ftechParams = {
        match: als.get('match'), // match is match object of react-router-dom
        query: req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    };

    await
        fetch(ftechParams)
            .then(function (response) {
                // check data and status exist
                if (!response.hasOwnProperty('data') || !response.hasOwnProperty('status'))
                    throw new Error('⛔ invalid fetch() response. "data" and "status" is required. pleace check axios returns.');

                // check status type
                if (typeof response.status !== "number")
                    throw new Error('⛔ invalid fetch() response. value of "status" is not number! pleace check axios returns.');

                // check status valid range
                if (response.status < 100 || response.status >= 600)
                    console.warn('📌 value of "status" is not in valid range (1** to 5**). status is ' + response.status)

                // set response status code
                als.set('status', response.status, true);

                const
                    stateName = als.get('stateName'),
                    updatedState = {[stateName]: response.data};

                // we use updatedState to set value of RSSR_UPDATED_REDUX_STATES in index template
                // to pass data to the client for syncing reduxes and merge with defaultState
                // of redux to creare store on the server
                als.set('updatedState', updatedState, true);
            });
    // catch() will be handel on the server.js with failedRes()

}
