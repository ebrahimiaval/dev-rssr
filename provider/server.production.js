const
    // utility
    path = require('path'),
    seoOptimization = require('./utility/seoOptimization'),
    rateLimit = require('./utility/rateLimit'),

    // express app
    express = require('express'),
    app = express(),

    // common setup
    commonSetup = require('./config/commonServerSetup'),

    // dist/server.js
    serverRendererPath = path.resolve(process.cwd(), './dist/server.js'),
    serverRenderer = require(serverRendererPath).default,

    // stats.json
    clientStatsPath = path.resolve(process.cwd(), './dist/stats.json'),
    stats = require(clientStatsPath);





// make bundled final project source files accessable
app.use('/dist', express.static(path.resolve(process.cwd(), './dist')));

// common action between production and development environments
commonSetup(app);

// Redirect domains starting with www to non-www and remove slash at the end of URL for improve SEO
seoOptimization(app);

// limit the request number of each user in 'windowMs' milliseconds
rateLimit(app);

// load server script and render app (do react SSR)
app.use(serverRenderer(stats));



// run server
const
    PORT = process.env.PORT || 4000,
    HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, error => {
    if (error)
        return console.error('Error in server.production.js: ', error);
    else
        console.log(`production server running at http://localhost:${process.env.PORT}`);
});
