// utility packages
const
    express = require('express'),
    path = require('path'),
    evnLoader = require('../utility/evnLoader');

// load .env files and define environment varibale
evnLoader();


/**
 * @param app <object> : an express base of server [const app = expres()]
 */
module.exports = function (app) {
    // used in in template.min.js
    global.version = Math.floor((Math.random() * 1000000));


    // load static files
    app.use(express.static(path.resolve(process.cwd(), 'public'), {maxage: '7d'}));
}
