import als from "async-local-storage";
import {isSet} from "../../utility/checkSet";


// fetch data from server
export const fetchProvider = async function (req) {
    // fetch() of component of matched route item
    const fetch = als.get('fetch');

    // when component has not fetch() then fetch is undefined
    if (isSet(fetch))
        return true;

    const
        ftechParams = {
            match: als.get('match'),
            query: req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
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

                const isPropBase = als.get('fetchType') === 'PROP_BASE';

                if (isPropBase) {
                    /** Props Base **/
                    // value of RSSR_DUCT in index template
                    als.set('duct', response.data, true);
                } else {
                    /** Redux Base **/
                    const updatedState = {[stateName]: response.data};
                    // contain only updated state.
                    // we use updatedState to set value of RSSR_UPDATED_REDUX_STATES in index template on the client
                    // and merge with defaultState of redux to creare store on the server
                    als.set('updatedState', updatedState, true);
                }
            });
    // catch() will be handel on the server.js with failedRes()

}
