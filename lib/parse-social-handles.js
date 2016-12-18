'use strict';

class ParseSocialHandles {

  constructor() {

    this.pattern = new RegExp(
      `(?:` +
        `(?:twitter\\.com\\/|@)`+
        `([_a-zA-Z0-9]{2,18})` +
      `|` +
        `skype\\s*\\:\\s*`+
        `([a-zA-Z][_a-zA-Z0-9,\\.\\-]{5,31})` +
      `|` +
        `linkedin\.com\/in\/` +
        `([a-zA-Z0-9]{2,32})` +
      `|` +
        `viadeo\.com\/[a-zA-Z]{1,3}\/profile/`+
        `([a-zA-Z0-9]{2,32})` +
      `|` +
        `facebook\.com\/`+
        `([a-zA-Z0-9\.]{2,32})` +
      `)[\\s]`, "gi"
    )

  }


  parse(input) {

    let text = ""
    if (typeof input === 'string') {
      text = input
    } else if (typeof input.text === 'string') {
      text = input.text
    } else {
      return Promise.reject(new Error(`input is not text but ${typeof input}`))
    }

    text = " " + text + " "

    let match, results = [];
    while ((match = this.pattern.exec(text)) !== null) {

      const twitter = match[1];
      const skype = match[2];
      const linkedin = match[3];
      const viadeo = match[4];
      const facebook = match[5];

      if (typeof twitter === "string") {
        results.push({
          network: "Twitter",
          username: twitter,
          url: `twitter.com/${twitter}`
        })
      } else if (typeof skype === "string") {
        results.push({
          network: "Skype",
          username: skype,
          url: `skype:${skype}?chat`
        })
      } else if (typeof linkedin === "string") {
        results.push({
          network: "LinkedIn",
          username: linkedin,
          url: `linkedin.com/in/${linkedin}`
        })
      } else if (typeof viadeo === "string") {
        results.push({
          type: "Viadeo",
          username: viadeo,
          url: `www.viadeo.com/profile/${viadeo}`
        })
      } else if (typeof facebook === "string") {
        results.push({
          type: "Facebook",
          username: facebook,
          url: `facebook.com/${facebook}`
        })
      }
    }
    return Promise.resolve(results);
  }
}


const singletonInstance = new ParseSocialHandles()
const singletonMethod = function() {
  return singletonInstance.parse.apply(singletonInstance, arguments);
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.parseSocialHandles = singletonInstance
module.exports.ParseSocialHandles = ParseSocialHandles
