import {getStore, setStore} from "trim-redux";
// config
// utility
import {isSet} from "../../root/utility/checkSet";
import {storage} from "../../root/utility/storage";





/**
 * Authorize user
 *
 * if(user is valid)
 *      return user details object
 * else
 *     return false
 *
 *
 *     when user is not login OR logout 'user === null'
 *     else 'user === user details'
 */
export const isValidUser = () => {
    const localUser = getStore('localUser');

    if (!isSet(localUser))
        return false;

    return localUser.token !== null;
}





/**
 * set "updated: true" to stop loading of need Authentication Component and
 * set "token: null" becuse user is invalid (is guest)
 * NOTICE: localUser of guest user does not "detail" property.
 */
const setLocalUserAsGuest = function () {
    setStore({localUser: {updated: true, token: null}});
}





/**
 * first Setup of APP
 * like user Authentication, get cart, set theme and more.
 */
export const firstSetup = () => {
    const token = storage.get('localUserToken');

    if (token === null) {
        // Guest user
        setLocalUserAsGuest();
    } else {
        // Real user
        // when token exist mean in the past one user loged in
        // but does not mean Real user is a valid user, so token need authentication.
        //
        // when server say token is valid then it's a Real and Valid user, and
        // when server say is NOT valid then runing signingOut() method and
        // set user as Guest user and remove token from localstorage.
        authentication(token)
            .then(() => {
                /**
                 * @@@ GET_USER_CART
                 */
            })
            .catch(() => {
                /**
                 * @@@ Clear_USER_Cart
                 */
            });
    }
}





/**
 * signing in user
 * push token to localStorage (change null to token string) just when user checked "remember me" checkbox.
 * NOTICE: if user do not checked "remember me" stay loged in Until the page refreshes.
 *
 * @param token <string>: user authentication key. like "eyJ0eXAiOiJKV1QiLCJhbGciOiJ...."
 * @param rememberMe <boolean>: state of "remember me" checkbox checked
 */
export const signingIn = (token, rememberMe) => {
    // set local User Token when rememberMe
    if (rememberMe)
        storage.set('localUserToken', token);

    // token validation and get user detail
    return authentication(token)
        .then(() => {
            /**
             * @@@ GET_USER_CART
             */
        });
}





/**
 * signing out user
 * clear localUser data in redux and set Gust User value to it.
 */
export const signingout = () => {
    // clear user detail from redux
    setLocalUserAsGuest();

    // clear user token from localstorage
    storage.set('localUserToken', null);

    /**
     * @@@ Clear_USER_Cart
     */
}





/**
 * authentication
 * this method do two action. validation token and get user details and set to redux.
 *
 * @param token <string>: user authentication key. like "eyJ0eXAiOiJKV1QiLCJhbGciOiJ...."
 * @returns {Promise<any>}: when user is valid do then and when invalid do catch
 */
export const authentication = (token) => {
    // return new Promise(function (resolve, reject) {
    //     ajax({
    //         name: 'authentication',
    //         url: api.userDetails,
    //         token: token
    //     })
    //     //--------------------------------------------------
    //         .done(async (userDetails) => {
    //             // set user as Real and valid user
    //             // and insert user detail with detail property
    //             setStore({
    //                 localUser: {
    //                     updated: true,
    //                     token: token,
    //                     detail: userDetails
    //                 }
    //             });
    //
    //             resolve('token is valid and user details ready to use');
    //         })
    //         //--------------------------------------------------
    //         .fail((xhr, textStatus, text) => {
    //             // when token is invalid
    //             if (text !== 'abort') {
    //                 signingout();
    //
    //                 toast.error('authentication error. please log in again.');
    //
    //                 reject(xhr);
    //             }
    //         });
    // })
}
