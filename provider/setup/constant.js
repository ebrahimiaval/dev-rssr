const path = require('path');


// paths
module.exports = {
    name: {
        client: 'client.js',
        server: 'server.js'
    },
    route: {
        dist: '/dist'
    },
    path: {
        client: './src/render/client.js',
        server: './src/render/server/server.js',
        dist: path.resolve(process.cwd(), './dist'),
        scss: path.resolve(process.cwd(), './src/setup/style'),
    }
}
