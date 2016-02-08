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
          type: "twitter",
          value: "test"
        }]
      }, {
        input: "skype: microsoft",
        output: [{
          type: "skype",
          value: "microsoft"
        }],
      },
        {
          input: "fr.linkedin.com/in/jamesbond",
          output: [{
            type: "linkedin",
            value: "jamesbond"
          }]
        },
      {
        input: "fr.viadeo.com/fr/profile/LaraCroft",
        output: [{
          type: "viadeo",
          value: "LaraCroft"
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
          type: "twitter",
          value: "test1"
        }, {
          type: "twitter",
          value: "test2"
        }]
      }, {
        input: "@johndoe @jamesbond en.viadeo.com/en/profile/JamesBond",
        output: [{
          type: "twitter",
          value: "johndoe"
        }, {
          type: "twitter",
          value: "jamesbond"
        }, {
          type: "viadeo",
          value: "JamesBond"
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

      const tests = [
        {
        input: "test @internet.com",
        output: []
      },{
        input: "test @microsoft.com",
        output: []
      },{
         // it's a trap!
         // at the moment we fall for it but we should fix this in the future
        input: "foobar @jamesbond .com",
        output: [ { type: 'twitter', value: 'jamesbond' } ]
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
