'use strict';

const request = require('request-promise-native');
const fs = require('fs');
const tar = require('tar');
const zlib = require('zlib');

const BASE_URL = 'https://api.github.com';

const getLatestReleaseUrl = (owner, repo) => {
    console.log(`Retrieving ${repo} contents...`)
    const options = {
        uri: `${BASE_URL}/repos/${owner}/${repo}/releases/latest`,
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
    };
    request(options).then((body) => getReleaseContents(body))
};

const getReleaseContents = (githubApiResponseJson) => {
    const options = {
        uri: JSON.parse(githubApiResponseJson).tarball_url,
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
    };
    request(options)
        .pipe(zlib.createGunzip())
        .pipe(tar.x({ path: './', strip: 1 }))
        .on('end', () => console.log('Project initialization complete!'));                
}

module.exports = {
    getLatestReleaseUrl,
    getReleaseContents
};