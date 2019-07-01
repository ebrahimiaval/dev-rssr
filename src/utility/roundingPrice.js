/**
 *  rounding price
 *
 *  remove 3 digit at end of price number (we call it endPart)
 *  and If this digits is more than zero then One is added to the original number.
 *
 *  exp: 55,801 IRR rounding to 56,000 IRR (useful after convert to tuman: 5,580TM => 5,600 TM)
 *
 * @param price Rial number.
 * @returns {number} : rounded price. like (
 */
export const roundingPrice = function (price) {
    if (typeof price === 'string') // convert string to number
        price = parseInt(price, 10);
    else if (typeof price !== 'number') // array, object and ... is not valid
        return price;

    let
        main = Math.floor(price / 1000), // in 55801 main is 55
        endPart = price - (main * 1000); // in 55801 endPart is 801

    if (endPart > 0)
        main++;

    return main * 1000;
}