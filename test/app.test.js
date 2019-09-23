import app from '../src/app'
const request = require("supertest");

describe("App Test", () => {

  test("Test hello", (done) => {
    /**
     * Do a request to '/', check the status (200) and 
     * compare the returned result
     */
    request(app)
      .get("/")
      .expect(200)
      .end(function(err, res) {
        expect(res.text).toBe('Hello World!')
        done();
      });
  });

  test("Test create event", (done) => {
    /**
     * We create an in memory database, and add one event.
     * Thus the id will always be one.
     */
    let event = {
      device: 'abc',
      type: 'weight',
      value: 123
    }
    request(app)
      .post("/events")
      .send(event)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        // make sure the id is one!
        expect(res.body.id).toBe(1)
        done();
      });
  });

  test("Test findAll", (done) => {
    request(app)
      .get("/events")
      .expect(200)
      .end(function(err, res) {
        // there should be one instance from the testcase before
        expect(res.body.length).toBe(1)
        expect(res.body[0].id).toBe(1)
        expect(res.body[0].device).toBe('abc')
        done();
      });
  });

});