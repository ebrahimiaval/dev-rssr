// regex pattern
// used for validation form
//
export const regexpPattern = {
    //like: m.ebrahimiaval@gmail.com
    email: '((([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})))',

    //like: 09199624169 OR +989199624169
    mobileNumber: '(^(\\+98|0)?9\\d{9}$)'
};