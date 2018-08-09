'use strict';

const tar = require('tar');
const zlib = require('zlib');

/**
 * @description extracts the tarball returned from the provided request
 * @param {Promise} stream stream of tarball file
 */
const extractTarball = (stream) => {
    stream.pipe(zlib.createGunzip())
        .pipe(tar.x({path: './', strip: 1}))
        .on('end', () => console.log('Project initialization complete!'));
};

module.exports = {
    extractTarball
};
