var jison = require('jison');
var fs = require('fs');

var expressions = fs.readFileSync(__dirname + '/expressions', 'utf8');

var rules;

function parser (options) {
  options = options || { };

  if (options.delimiter === undefined) {
    options.delimiter = ',';
  }


  if (options.delimiter.match(/\s+/)) {
    rules = [ ];
    rules.push('"' + options.delimiter + '" return "DELIMITER"');
    rules.push('\\s+ // ignore');
    rules.push('\\"(?:[^"\\\\]|\\\\.)*\\"  return "QUOTED"');
    rules.push("\\'(?:[^'\\\\]|\\\\.)*\\'  return 'UNQUOTED'");
    rules.push('[^' + options.delimiter + ']+ return "UNQUOTED"');
    rules.push('<<EOF>> return "EOF"');
    rules.push('. return "INVALID"\n');
  } else {
    rules = [ ];
    if (options['strip-whitespace'] === true) {
      rules.push('\\s+ // ignore');
    }
    rules.push('"' + options.delimiter + '" return "DELIMITER"');
    rules.push('\\"(?:[^"\\\\]|\\\\.)*\\"  return "QUOTED"');
    rules.push("\\'(?:[^'\\\\]|\\\\.)*\\'  return 'UNQUOTED'");
    rules.push('[^' + options.delimiter + ']+ return "UNQUOTED"');
    rules.push('<<EOF>> return "EOF"');
    rules.push('. return "INVALID"\n');
  }

  var grammar = "%lex\n%%\n" + rules.join("\n") + "/lex" + expressions;

  return jison.Parser(grammar);
}

module.exports = exports = parser;
