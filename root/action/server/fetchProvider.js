import als from "async-local-storage";


// fetch data from server
export const fetchProvider = async function (req) {
    const fetchType = als.get('fetchType');

    // when component has not fetch() then fetch is undefined
    if (fetchType === 'WITH_OUT_FETCH')
        return true;


    const
        // fetch() of component of matched route item
        fetch = als.get('fetch'),

        // pass to fetch() as params
        ftechParams = {
            // match is match object of react-router-dom
            // match of "site.com/post/1" is:
            //     {
            //         path: '/post/:postId',
            //         url: '/post/1',
            //         isExact: true,
            //         params: {postId: '1'}
            //      }
            match: als.get('match'),

            //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
            query: req.query
        };


    await
        fetch(ftechParams)
            .then(function (response) {
                // check data and status exist
                if (!response.hasOwnProperty('data') || !response.hasOwnProperty('status'))
                    throw new Error('⛔ invalid fetch() response. "data" and "status" is required in success responses. pleace check axios returns.\n');

                // check status type
                if (typeof response.status !== "number")
                    throw new Error('⛔ invalid fetch() response. value of "status" is not number! pleace check axios returns.\n');

                // check status valid range
                if (response.status < 100 || response.status >= 600)
                    console.warn('📌 value of "status" is not in valid range (1** to 5**). status is ' + response.status)

                // set server response status code
                als.set('status', response.status, true);

                /** Props Base **/
                if (fetchType === 'PROP_BASE') {
                    // value of RSSR_DUCT in index template
                    als.set('duct', response.data, true);
                }
                /** Redux Base **/
                else {
                    const
                        stateName = als.get('stateName'),
                        updatedState = {[stateName]: response.data};

                    // we use updatedState to set value of RSSR_UPDATED_REDUX_STATES in index template
                    // to pass data to the client for syncing reduxes and merge with defaultState
                    // of redux to creare store on the server
                    als.set('updatedState', updatedState, true);
                }
            });
    // catch() will be handel on the server.js with failedRes()

}
