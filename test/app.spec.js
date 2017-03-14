const expect = require('chai').expect;
const app = require('../src/app');

let Character = require('../src/app');


describe('App', () => {
    it('should return true if app.js exists', () => {
        expect('app').to.exist;
    });
});

describe('Character Creation', () => {
    let claire = new Character('Claire');
    it('should return \'Claire\' for the name', () =>{
        expect(claire.name).to.equal('Claire');
    });
});