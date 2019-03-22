const Parser = require('rss-parser');
const parser = new Parser();
const notification = require('node-notifier');
const path = require('path');
const open = require('open');
const dayjs = require("dayjs");
const colors = require('colors');

const config = require('./config');

//const guids = [];

module.exports = class Notifier {

    constructor() {
        if (config.sources) {
            this.getFeeds();
        }

        this.guids = [];
    }

    getFeeds() {
        const that = this;

        setInterval(() => {
            config.sources.forEach((source) => {
                try {
                    parser.parseURL(source).then((feed) => {

                        const items = feed.items;
                        const item = items[0];

                        const diffDays = dayjs().diff(dayjs(item.isoDate), 'day');

                        if (!that.guids.includes(item.guid) && diffDays <= 1) {
                            that.notify(feed.title.trim(), item.contentSnippet.trim(), item.link.trim());
                            that.draw(item);

                            that.guids.push(item.guid);
                        }

                    });
                } catch (e) {
                    console.error(`Error: ${e}`);
                }

            });
        }, (config.interval * 60000));


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

    draw(feed) {
        console.log('\n_____________________________________________________________\n');
        console.log(colors.green(feed.title));
        console.log(colors.yellow(feed.link));
        console.log('\n' + feed.contentSnippet);
    }
}