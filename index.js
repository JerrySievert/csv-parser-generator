var jison = require('jison');
var fs = require('fs');

var expressions = fs.readFileSync(__dirname + '/expressions', 'utf8');
var rules_src = fs.readFileSync(__dirname + '/rules', 'utf8');

var rules = rules_src.split("\n");

function parser (options) {
  options = options || { };

  if (options.delimiter === undefined) {
    options.delimiter = ',';
  }


  if (options.delimiter.match(/\s+/)) {
    rules.unshift('\\s+ // ignore');
    rules.unshift('"' + options.delimiter + '" return "DELIMITER"');
    rules.push('[a-zA-Z0-9\\-_:;\\s]+             return "UNQUOTED"');
    rules.push('<<EOF>>                       return "EOF"');
    rules.push('.                             return "INVALID"');
  } else {
    rules.unshift('"' + options.delimiter + '"' + ' return "DELIMITER"');
    rules.unshift('\\s+ // ignore');
    rules.push('[a-zA-Z0-9:;\\-_]+             return "UNQUOTED"');
    rules.push('<<EOF>>                       return "EOF"');
    rules.push('.                             return "INVALID"');
  }

  var grammar = "%lex\n%%\n" + rules.join("\n") + "/lex" + expressions;

  return jison.Parser(grammar);
}

module.exports = exports = parser;
