const expect = require('chai').expect;
const sinon = require('sinon');
const app = require('../src/app');

let Character = require('../src/app');

describe('App', () => {
    it('should return true if app.js exists', () => {
        expect('app').to.exist;
    });
});

describe('Character Creation', () => {
    describe('Character Name', () => {
        let claire = new Character('Claire', 'Good');
        let peter = new Character('Peter', 'Neutral');

        it('should return \'Claire\' for the name', () => {
            expect(claire.name).to.equal('Claire');
        });

        it('should return the name passed to it as the name', () => {
            expect(peter.name).to.equal('Peter');
        });
    });

    describe('Character Alignment', () => {
        let george = new Character('George', 'Good');
        it('should set alignment from alignment input(Good)', () => {
            expect(george.alignment).to.equal('Good');
        });

        it("should disallow alignments other than 'Evil', 'Good', and 'Neutral'", () => {
            expect(() => { let chelsea = new Character('Chelsea', 'Okayish'); }).to.throw(ReferenceError);
        });
    });


});