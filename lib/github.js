'use strict';

const requestwithPromise = require('request-promise-native');
const request = require('request');
const files = require('./files');

const BASE_URL = 'https://api.github.com';

/**
 * @description loads the contents of the latest release of a github repo into the
 * curren directory
 * @param {String} owner the repo owner
 * @param {String} repo the name of the repo
 */
const getLatestRelease = (owner, repo) => {
    console.log(`Retrieving ${repo} contents...`);
    getReleaseMetadata(owner, repo)
        .then((body) => getReleaseContent(body))
        .then((response) => files.extractTarball(response));
};

/**
 * @description retrieves the metadata for the most recent release
 * @param {String} owner the repo owner
 * @param {String} repo the name of the repo
 * @return {Promise} promise resulting from the request to get the release repo metadata
 */
const getReleaseMetadata = (owner, repo) => {
    const options = {
        uri: `${BASE_URL}/repos/${owner}/${repo}/releases/latest`,
        method: 'GET',
        headers: {'user-agent': 'node.js'}
    };
    return requestwithPromise(options);
}

/**
 * @description parses the response body for latest release and returns the tarball
 * associated with the release
 * @param {String} githubApiResponseJson json response string from getting the most recent release
 * @return {Promise} promise resulting from the request to the tarball url
 */
const getReleaseContent = (githubApiResponseJson) => {
    const options = {
        uri: JSON.parse(githubApiResponseJson).tarball_url,
        method: 'GET',
        headers: {'user-agent': 'node.js'}
    };
    return request(options);
};

module.exports = {
    getLatestRelease
};
