var jison = require('jison');
var fs = require('fs');

var expressions = fs.readFileSync('./expressions', 'utf8');
var rules_src = fs.readFileSync('./rules', 'utf8');

var rules = rules_src.split("\n");

function parser (options) {
  options = options || { };

  if (options.delimiter === undefined) {
    options.delimiter = ',';
  }


  if (options.delimiter.match(/\s+/)) {
    rules.unshift('\\s+ // ignore');
    rules.unshift('" " return "DELIMITER"');
  } else {
    rules.unshift('"' + options.delimiter + '"' + ' return "DELIMITER"');
    rules.unshift('\\s+ // ignore');
  }

  var grammar = "%lex\n%%\n" + rules.join("\n") + "/lex" + expressions;

  return jison.Parser(grammar);
}

module.exports = exports = parser;
