const chai = require('chai')
chai.use(require('chai-fuzzy'))
const expect = chai.expect

import parseSocialHandles from '../../lib/parse-social-handles'

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
