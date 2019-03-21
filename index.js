// setup error handler
require('pretty-error').start();

const Notifier = require('./notifier/notifier');

// catch un-handled promise errors
process.setMaxListeners(0);
process.on("unhandledRejection", (reason, p) => {});

try {
    const notifier = new Notifier();
    notifier.getFeeds();

} catch (e) {
    console.error(`Error: ${e}`);
}