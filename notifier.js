const Parser = require('rss-parser');
const parser = new Parser();

module.exports = class Notifier {

    constructor({
        // news source/rss URLs
        sources = [],
        // feed checking interval in minutes
        interval = 1
    } = {}) {

        this.sources = sources;
        this.interval = (interval * 60000);

        if (this.sources) {
            this.getFeeds();
            this.setupInterval();
        }

    }

    getFeeds() {
        /*
        this.sources.forEach((source) => {
            console.log(source);
        });
        */

        parser.parseURL(this.sources[1]).then((feed) => {
            //console.log(feed);

            feed.items.forEach(item => {
                console.log(item);
                process.exit(1);
            });

        });
    }

    setupInterval() {
        //setInterval(this.getFeeds, this.interval);
    }
}