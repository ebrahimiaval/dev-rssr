const path = require('path');

// paths
module.exports = {
    name: {
        client: 'client.js',
        server: 'server.js'
    },
    path: {
        client: './src/render/client.js',
        server: './src/render/server/server.js',
        dist: '/dist/',
        dist_full: path.resolve(process.cwd(), './dist'),
        scss: path.resolve(process.cwd(), './src/setup/style'),
    }
}
