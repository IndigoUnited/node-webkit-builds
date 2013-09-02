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
    it.skip('linux32 resource should exist', function (done) {

    });

    it.skip('linux64 resource should exist', function (done) {

    });

    it.skip('win32 resource should exist', function (done) {

    });

    it.skip('mac32 resource should exist', function (done) {

    });
});

describe('change log', function () {
    it.skip('resource should exist', function () {

    });
});