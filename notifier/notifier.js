const Parser = require('rss-parser');
const parser = new Parser();
const notification = require('node-notifier');
const path = require('path');
const open = require('open');
const dayjs = require("dayjs");

const config = require('./config');

module.exports = class Notifier {

    constructor() {

        this.guids = [];
        this.count = 0;

        if (config.sources) {
            this.getFeeds();
            this.setupInterval();
        }

    }

    getFeeds() {
        config.sources.forEach((source) => {
            try {
                parser.parseURL(source).then((feed) => {

                    const items = feed.items;
                    const item = items[0];

                    const diffDays = dayjs().diff(dayjs(item.isoDate), 'day');

                    if (!this.guids.includes(item.guid) && diffDays <= 1) {
                        this.notify(feed.title.trim(), item.contentSnippet.trim(), item.link.trim());
                        this.guids.push(item.guid);
                        this.count++;

                        console.log(`New Feed ${this.count} - ${item.title.trim()}`);
                    }

                });
            } catch (e) {
                console.error(`Error: ${e}`);
            }

        });
    }

    setupInterval() {
        setInterval(this.getFeeds, (config.interval * 60000));
    }

    // used to show notification on right bottom of screen
    notify(title, message, link) {
        notification.notify({
            appName: "Snore.DesktopToasts",
            title: title,
            message: message,
            icon: path.join(__dirname, 'icon.png'),
            wait: true,
            link: link
        });

        notification.on('click', (obj, options) => {
            open(options.link);
        });
    }
}