"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParseSocialHandles = function () {
  function ParseSocialHandles() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ParseSocialHandles);

    this.opts = opts;
    this.pattern = new RegExp("(?:" + "(?:(?:twitter\\s*\\:\\s*(?:@\\s*)?|@)([_a-zA-Z0-9]{2,18}))" + "|" + "(?:(?:skype\\s*\\:\\s*)([a-zA-Z][_a-zA-Z0-9,\\.\\-]{5,31}))" + ")", "gi");
  }

  // opts are not used yet

  (0, _createClass3.default)(ParseSocialHandles, [{
    key: "parse",
    value: function parse(input) {
      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var text = "";
      if (typeof input === 'string') {
        text = input;
      } else if (typeof input.text === 'string') {
        text = input.text;
      } else {
        return _promise2.default.reject(new Error("input is not text but " + (typeof input === "undefined" ? "undefined" : (0, _typeof3.default)(input))));
      }

      var match = undefined,
          results = [];
      while ((match = this.pattern.exec(text)) !== null) {
        var twitter = match[1];
        var skype = match[2];
        if (typeof twitter === "string") {
          results.push({
            type: "twitter",
            value: twitter
          });
        } else if (typeof skype === "string") {
          results.push({
            type: "skype",
            value: skype
          });
        }
      }
      return _promise2.default.resolve(results);
    }
  }]);
  return ParseSocialHandles;
}();

var singletonInstance = new ParseSocialHandles({});
var singletonMethod = function singletonMethod() {
  return singletonInstance.parse.apply(singletonInstance, arguments);
};

module.exports = singletonMethod;
module.exports.default = singletonMethod;
module.exports.parseSocialHandles = singletonInstance;
module.exports.ParseSocialHandles = ParseSocialHandles;