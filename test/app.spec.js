const expect = require('chai').expect;
const app = require('../src/app');

describe('App', () => {
    it('should return true if app.js exists', () => {
        expect('app').to.exist;
    });
}); 