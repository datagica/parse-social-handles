
class ParseSocialHandles {
  constructor(opts = {}) {
    this.opts = opts
    this.pattern = new RegExp(
      `(?:` +
        `(?:(?:twitter\\.com\\/|\\s+@)([_a-zA-Z0-9]{2,18}))` +
      `|` +
        `(?:(?:skype\\s*\\:\\s*)([a-zA-Z][_a-zA-Z0-9,\\.\\-]{5,31}))` +
      `)`, "gi"
    )
  }

  // opts are not used yet
  parse(input, opts = {}) {

    let text = ""
    if (typeof input === 'string') {
      text = input
    } else if (typeof input.text === 'string') {
      text = input.text
    } else {
      return Promise.reject(new Error(`input is not text but ${typeof input}`))
    }
    text = " " + text

    let match, results = [];
    while ((match = this.pattern.exec(text)) !== null) {
      const twitter = match[1];
      const skype = match[2];
      if (typeof twitter === "string") {
        results.push({
          type: "twitter",
          value: twitter
        })
      } else if (typeof skype === "string") {
        results.push({
          type: "skype",
          value: skype
        })
      }
    }
    return Promise.resolve(results);
  }
}


const singletonInstance = new ParseSocialHandles({})
const singletonMethod = function(...opts) {
  return singletonInstance.parse(...opts)
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.parseSocialHandles = singletonInstance
module.exports.ParseSocialHandles = ParseSocialHandles
