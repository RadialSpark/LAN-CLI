'use strict';

const files = require('../lib/files');
const request = require('request');
const nock = require('nock');
const mockFs = require('mock-fs');
const fs = require('fs');

const BASE_URL = 'https://api.github.com';
const TEST_PATH = '/repos/testowner/testrelease';

describe('extractTarball ', () => {
    beforeEach(() => {
        mockFs({
            'test/directory': {
                'test.tar.gz': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
            },
        });
        nock(BASE_URL).get(TEST_PATH).reply(200, Buffer.from(fs.readFileSync('test/directory/test.tar.gz')));
    });
    afterEach(() => {
        mockFs.restore();
    });
    it('should successfully pass the stream through the handlers', (done) => {
        const req = request(`${BASE_URL}${TEST_PATH}`);
        files.extractTarball(req);
        done();
    });
});
