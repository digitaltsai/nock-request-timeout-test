var nock   = require('nock');
var request = require('request');

nock('http://google.com')
  .get('/')
  .delay(1000)
  .reply(200, {});

request({
  url: 'http://google.com',
  timeout: 10
}, function (err, response) {
  console.log(err); // should be expecting ESOCKETTIMEDOUT, but prints null
});
