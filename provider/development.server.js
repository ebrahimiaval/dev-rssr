// load .env files and define environment varibale before all actions
require('./utility/evnLoader');

const
    opn = require('opn'),
    path = require('path'),
    waitForLocalhost = require('wait-for-localhost'),

    // express app
    express = require('express'),
    app = express(),

    // webpack
    webpack = require('webpack'),
    config = require('./development.webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackHotServerMiddleware = require('webpack-hot-server-middleware');





// create webpack compiler
const compiler = webpack(config);

// make bundled project source files accessable from memory
app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: "/dist/"
}));

// load static files
app.use(express.static(path.resolve(process.cwd(), 'public'), {maxage: '7d'}));

// recompile webpack when file changes
app.use(webpackHotMiddleware(compiler));

// hot update Webpack bundles on the server
app.use(webpackHotServerMiddleware(compiler));





// run server
const PORT = process.env.PORT || 4000;

app.listen(PORT, error => {
    if (error) {
        return console.error('Error in server.development.js: ', error);
    } else {
        // wait to project built and app ready
        waitForLocalhost({port: PORT})
            .then(function () {
                // open project in browser
                opn(`http://localhost:${PORT}`);

                console.log(`development server running at http://localhost:${process.env.PORT}`);
            });
    }
});
