/*global describe, it*/

'use strict';

var expect = require('expect.js');

var m   = require('../package.json');
var nwb = require('../index');

describe('package version', function () {
    it('should be the same as the module version', function () {
        expect(m.version).to.be(nwb.version);
    });
});

describe('build links', function (done) {
    it.skip('should download the linux32 link', function (done) {

    });

    it.skip('should download the linux64 link', function (done) {

    });

    it.skip('should download the win32 link', function (done) {

    });

    it.skip('should download the mac32 link', function (done) {

    });
});

describe('change log', function () {
    it.skip('should be be a valid URL', function () {

    });
});