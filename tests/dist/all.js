'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _parseSocialHandles = require('../../lib/parse-social-handles');

var _parseSocialHandles2 = _interopRequireDefault(_parseSocialHandles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
chai.use(require('chai-fuzzy'));
var expect = chai.expect;

describe('@datagica/parse-social-handles', function () {

  describe('matching social handles', function () {

    it('should match simple handles', function (done) {

      var tests = [{
        input: "@test",
        output: [{
          type: "twitter",
          value: "test"
        }]
      }, {
        input: "twitter: test",
        output: [{
          type: "twitter",
          value: "test"
        }]
      }, {
        input: "skype: microsoft",
        output: [{
          type: "skype",
          value: "microsoft"
        }]
      }];

      _promise2.default.all(tests.map(function (test) {
        return (0, _parseSocialHandles2.default)(test.input).then(function (output) {
          console.log("output: " + JSON.stringify(output));
          expect(output).to.be.like(test.output);
          return _promise2.default.resolve(true);
        });
      })).then(function (ended) {
        console.log('test ended');
        done();
        return true;
      }).catch(function (exc) {
        console.error(exc);
      });
    });

    it('should match multiple handles', function (done) {

      var tests = [{
        input: "@test1 @test2",
        output: [{
          type: "twitter",
          value: "test1"
        }, {
          type: "twitter",
          value: "test2"
        }]
      }];

      _promise2.default.all(tests.map(function (test) {
        return (0, _parseSocialHandles2.default)(test.input).then(function (output) {
          console.log("output: " + JSON.stringify(output));
          expect(output).to.be.like(test.output);
          return _promise2.default.resolve(true);
        });
      })).then(function (ended) {
        console.log('test ended');
        done();
        return true;
      }).catch(function (exc) {
        console.error(exc);
      });
    });
  });
});