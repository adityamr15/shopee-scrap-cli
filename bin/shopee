#! /usr/bin/env node

const yargs = require("yargs");
const spinners = require('cli-spinners');
const logUpdate = require('log-update');

const { searchItem } = require('../request');
const { textColor } = require('../util');

let intervalId;

const argv = yargs
    .command('search',
        textColor.yellow('Will search shopee item by keywords and show the result.\nExample: shopee search "iPhone"'),
        {
            count: {
                alias: 'c',
                default: 5,
                description: 'Much item to show'
            }
        },
        async (args) => {
            const [cmd, keywords] = args._;
            const count = args.count;

            if (!keywords) {
                yargs.showHelp();
                return;
            }

            try {
                startSpinner(keywords);

                const items = await searchItem(keywords, count);

                clearInterval(intervalId);
                logUpdate.clear();
                
                console.table(items.map(item => ({
                    Title: item.title,
                    Rating: item.rating,
                    Price: `IDR ${item.price.min} - IDR ${item.price.max}`,
                    Location: item.location
                })));
            } catch (error) {
                clearInterval(intervalId);
                logUpdate.clear();

                console.log('Failed to search. Please try again!');
            }
        })
    // .command()
    .help(false)
    .version(false)
    .argv._;

if (argv && argv[0] == null) {
    yargs.showHelp();
}

function startSpinner(keyword) {
    const { frames, interval } = spinners.monkey;
    let i = 0;

    intervalId = setInterval(() => {
        logUpdate(frames[i = ++i % frames.length] + 'Please be patient. Looking for "' + keyword + '"...');
    }, interval);
}