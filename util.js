const chalk = require('chalk');

function yellow(text) {
    return chalk.yellow`${text}`;
}

module.exports = {
    textColor: {
        yellow
    }
};