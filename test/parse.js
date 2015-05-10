var test = require('tape');

var generator = require('../index');

test('generator works when passed no delimiter', function (t) {
  t.plan(4);

  var parser = generator();
  var results = parser.parse('"foo bar",bar,baz');

  t.equal(results.length, 3);
  t.equal(results[0], 'foo bar');
  t.equal(results[1], 'bar');
  t.equal(results[2], 'baz');
});

test('generator works when passed delimiter set to ,', function (t) {
  t.plan(4);

  var parser = generator({ delimiter: "," });
  var results = parser.parse('"foo bar",bar,baz');

  t.equal(results.length, 3);
  t.equal(results[0], 'foo bar');
  t.equal(results[1], 'bar');
  t.equal(results[2], 'baz');
});

test('generator works when passed delimiter set to , and whitespace trimmed', function (t) {
  t.plan(4);

  var parser = generator({ delimiter: ",", "strip-whitespace": true });
  var results = parser.parse('"foo bar", bar, baz');

  t.equal(results.length, 3);
  t.equal(results[0], 'foo bar');
  t.equal(results[1], 'bar');
  t.equal(results[2], 'baz');
});

test('generator works when passed delimiter set to space', function (t) {
  t.plan(4);

  var parser = generator({ delimiter: " " });
  var results = parser.parse('"foo bar" bar baz');

  t.equal(results.length, 3);
  t.equal(results[0], 'foo bar');
  t.equal(results[1], 'bar');
  t.equal(results[2], 'baz');
});
