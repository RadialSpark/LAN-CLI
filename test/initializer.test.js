const initializer = require('../lib/initializer');
const sinon = require('sinon');

describe('initializer ', () => {
    it('should do nothing if no argument is passed in', (done) => {
        //let github = require('../lib/github');
        //let mock = sinon.mock(github);
        //mock.expects('getLatestRelease').notCalled();
        initializer();
        //mock.verify();
        done();
    });
});
