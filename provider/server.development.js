const
    // utility
    opn = require('opn'),
    waitForLocalhost = require('wait-for-localhost'),

    // express app
    express = require('express'),
    app = express(),

    // common setup
    commonServerSetup = require('./config/commonServerSetup'),

    // webpack compiler
    webpack = require('webpack'),
    config = require('./config/webpack.config.development'),
    compiler = webpack(config),

    // reload project when files changed
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackHotServerMiddleware = require('webpack-hot-server-middleware');





// common action between production and development environments
commonServerSetup(app);

// make bundled project source files accessable from memory
app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: "/dist/"
}));

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
