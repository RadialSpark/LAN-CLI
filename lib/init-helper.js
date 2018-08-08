'use strict';

const github = require('./github-helper');

const OWNER = 'RadialSpark';

module.exports = (cmd, type) => {
    if (!type) return console.log('Type must be provided. The following are acceptable types: lan, plan')
    switch (type.toLowerCase()) {
        case 'lan':
            github.getLatestReleaseUrl(OWNER, 'LAN-Stack')
            break;
        case 'plan': 
            github.getLatestReleaseUrl(OWNER, 'PLAN-Stack');
            break;
        default:
            console.log(`Invalid type '${type}' provided. The following are acceptable types: lan, plan`);
            break;
    }
}