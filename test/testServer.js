var request = require('supertest');
const assert = require('supertest').assert;

describe('loading app', function () {
  var server;
  beforeEach(function () {
    server = require('../server');
  });
  afterEach(function () {
    server.close();
  });
  //tests server is on
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  //gives error for all other urls
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo')
      .expect(404, done);
  });
  //page should return hello world
  it('responds with hello world', function() {
    return request(server)
      .get('/')
      .expect(200)
      .expect(function(res){
        res.body = 'hello world'
      })
  });
});
