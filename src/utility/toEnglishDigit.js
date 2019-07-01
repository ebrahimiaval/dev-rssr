/**
 * convert Persian digi to English Digit
 *
 * @param str : string - like: "۰۹۳۶۲۲۲۱۱۲۲"
 * @return string with English digit. liek: 09362221122
 */
export const toEnglishDigit = (str) => {

    if (typeof str === 'number')
        str = str.toString();
    else if (typeof str !== 'string') // array, object and ... is not valid
        return false;

    return str.replace(/[\u06F0-\u06F9]/g, function (digit) {
        switch (digit) {
            case '۰':
                digit = '0';
                break;
            case '۱':
                digit = '1';
                break;
            case '۲':
                digit = '2';
                break;
            case '۳':
                digit = '3';
                break;
            case '۴':
                digit = '4';
                break;
            case '۵':
                digit = '5';
                break;
            case '۶':
                digit = '6';
                break;
            case '۷':
                digit = '7';
                break;
            case '۸':
                digit = '8';
                break;
            default:
                digit = '9';
        }
        return digit;
    });
}

