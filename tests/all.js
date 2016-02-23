const chai = require('chai')
chai.use(require('chai-fuzzy'))
const expect = chai.expect

const parseSocialHandles = require("../lib/parse-social-handles");

describe('@datagica/parse-social-handles', () => {

  describe('matching social handles', () => {


    it('should match simple handles', done => {
      const tests = [{
        input: "@test",
        output: [{
          "network": "Twitter",
          "username": "test",
          "url": "http://twitter.com/test"
        }]
      }, {
        input: "skype: microsoft",
        output: [{
          "network": "Skype",
          "username": "microsoft",
          "url": "skype:microsoft?chat"
        }],
      }, {
        input: "fr.linkedin.com/in/jamesbond",
        output: [{
          "network": "LinkedIn",
          "username": "jamesbond",
          "url": "http://linkedin.com/in/jamesbond"
        }]
      }, {
        input: "fr.viadeo.com/fr/profile/LaraCroft",
        output: [{
          "type": "Viadeo",
          "username": "LaraCroft",
          "url": "http://www.viadeo.com/profile/LaraCroft"
        }]
      }]

      Promise.all(tests.map(test => {
        return parseSocialHandles(test.input).then(output => {
          console.log("output: " + JSON.stringify(output));
          expect(output).to.be.like(test.output)
          return Promise.resolve(true)
        })
      })).then(ended => {
        console.log(`test ended`)
        done()
        return true
      }).catch(exc => {
        console.error(exc)
      })
    })

    it('should match multiple handles', done => {

      const tests = [{
        input: "@test1 @test2",
        output: [{
          network: 'Twitter',
          username: 'test1',
          url: 'http://twitter.com/test1'
        }, {
          network: 'Twitter',
          username: 'test2',
          url: 'http://twitter.com/test2'
        }]
      }, {
        input: "@johndoe @jamesbond en.viadeo.com/en/profile/JamesBond",
        output: [{
          network: 'Twitter',
          username: 'johndoe',
          url: 'http://twitter.com/johndoe'
        }, {
          network: 'Twitter',
          username: 'jamesbond',
          url: 'http://twitter.com/jamesbond'
        }, {
          type: 'Viadeo',
          username: 'JamesBond',
          url: 'http://www.viadeo.com/profile/JamesBond'
        }]
      }]

      Promise.all(tests.map(test => {
        return parseSocialHandles(test.input).then(output => {
          console.log("output: " + JSON.stringify(output));
          expect(output).to.be.like(test.output)
          return Promise.resolve(true)
        })
      })).then(ended => {
        console.log(`test ended`)
        done()
        return true
      }).catch(exc => {
        console.error(exc)
      })
    })

    it('should not match emails', done => {

      const tests = [{
        input: "test @internet.com",
        output: []
      }, {
        input: "test @microsoft.com",
        output: []
      }, {
        // it's a trap!
        // at the moment we fall for it but we should fix this in the future
        input: "foobar @jamesbond .com",
        output: [{
          network: 'Twitter',
          username: 'jamesbond',
          url: 'http://twitter.com/jamesbond'
        }]
      }]

      Promise.all(tests.map(test => {
        return parseSocialHandles(test.input).then(output => {
          console.log("output: " + JSON.stringify(output));
          expect(output).to.be.like(test.output)
          return Promise.resolve(true)
        })
      })).then(ended => {
        console.log(`test ended`)
        done()
        return true
      }).catch(exc => {
        console.error(exc)
      })
    })

  })

})
