var nock   = require('nock');
var http = require('http');

// comment out the below nock portion, and the timeout will work
nock('http://google.com')
  .get('/')
  .delay(1000)
  .reply(200, {});
// comment out above block to test without nock

var req = http.get({
  host: 'google.com',
  path: '/'
}, function(res) {
  var body = '';
  res.on('data', function(data) {
    body += data;
  });

  res.on('end', function() {
    console.log('ended, supposed to show "timed out"');
  });
}).on('error', function() {
  console.log('errored (probably through timeout for this test)');
});

// https://nodejs.org/api/http.html#http_request_settimeout_timeout_callback
req.setTimeout(1, function() {
  console.log('timed out');
  req.abort();
});
