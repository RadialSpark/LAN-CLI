'use strict';

const tar = require('tar');
const zlib = require('zlib');

/**
 * @description extracts the tarball returned from the provided request
 * @param {Promise} request pormise returned from the request module
 */
const extractTarballFromRequest = (request) => {
    request.pipe(zlib.createGunzip())
        .pipe(tar.x({path: './', strip: 1}))
        .on('end', () => console.log('Project initialization complete!'));
};

module.exports = {
    extractTarballFromRequest
};
