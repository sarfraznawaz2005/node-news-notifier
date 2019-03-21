// setup error handler
require('pretty-error').start();

const Notifier = require('./notifier');
const config = require('./config');

new Notifier({
    sources: config.sources,
    interval: config.interval
});