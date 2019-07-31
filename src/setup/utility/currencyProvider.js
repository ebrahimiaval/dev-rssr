import React from 'react';
// utility
import {roundingPrice} from "./roundingPrice";





/**
 * currencyProvider have 2 type send parameter (full config or shorthand)
 *  full config: send one object as first parameter contain all configs. *
 *  shorthand : send price number as first parameter
 *  when send string we set it for unit and when send false we set for irrToTm.
 *
 * @param price <number||number as string> : currency number
 * @param type <string> : currency unit label type. ('none' 'span' 'raw'(default) )
 * @param ziro <boolean || string> : if ziro === true then conver ziro to 'رایگان' else
 * if typeof 'ziro' === string then conver ziro to 'ziro' string.
 *
 * @returns {*}
 */
export const currencyProvider = (userConfig, spareConfig) => {
    let config = {
        type: 'raw',
        unit: 'DL', // DL ||  BTC
        float: 2,
        irrToTm: true,
        ziro: false,
        round: false
    };

    // shorthand or full config
    if (typeof userConfig === "object")
        config = {
            ...config,
            ...userConfig
        };
    else {
        config.price = userConfig;

        if (typeof spareConfig === "string")
            config.unit = spareConfig;
        else if (spareConfig === false)
            config.irrToTm = false;
    }

    // access to variable
    let {price, type, float, ziro, round, unit} = config;

    // validaton
    if (!(typeof price === 'number' || (typeof price === 'string' && !isNaN(parseFloat(price)))))
        return price; // reject invalid price (just number and number as string is valid)

    const numbricPrice = parseFloat(price);

    // conver ziro to string
    if (numbricPrice === 0 && ziro !== false)
        return (typeof ziro === "string") ? ziro : 'Free';

    // remove 3 digit at end of price number (we call it endPart)
    //  and If this digits is more than zero then One is added to the original number.
    if (round)
        price = roundingPrice(numbricPrice);

    // convert price number to string
    if (typeof price === "number")
        price = price.toString();

    // mainPart & floorPart
    // split price part and price[0] is main part and price[1] if exist is floor part.
    // like: 122.34 => main:122 & floor:34
    price = price.split('.');
    let mainPart = price[0],
        floorPart = price[1];

    // splite price with ','
    price = mainPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // when have floor part
    if (typeof floorPart !== 'undefined' && float !== false)
        price = price + '.' + floorPart.slice(0, float);

    // set unit
    switch (unit) {
        case 'DL':
            if (type === 'raw')
                price = "$" + price;
            else if (type === 'span')
                price = [<span className="dl-unit" key="tm-unit">$</span>, price];
            break;
        case 'BTC':
            if (type === 'raw')
                price = price + " BTC";
            else if (type === 'span')
                price = [price, <span className="btc-unit" key="tm-unit"> BTC</span>];
            break;
        default:
            ;
    }
    //
    return price;
}