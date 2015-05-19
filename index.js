var jison = require('jison');
var fs = require('fs');

//var expressions = fs.readFileSync(__dirname + '/expressions', 'utf8');


function parser (options) {
  var rules = [ ];
  options = options || { };

  if (options.delimiter === undefined) {
    options.delimiter = ',';
  }


  if (options.delimiter.match(/\s+/)) {
    rules.push('"' + options.delimiter + '" return "DELIMITER"');
    rules.push('\\s+ // ignore');

    if (options['ignore-quotes'] !== true) {
      rules.push('\\"(?:[^"\\\\]|\\\\.)*\\"  return "QUOTED"');
      rules.push("\\'(?:[^'\\\\]|\\\\.)*\\'  return 'SINGLEQUOTED'");
    }
    rules.push('[^' + options.delimiter + ']+ return "UNQUOTED"');
    rules.push('<<EOF>> return "EOF"');
    rules.push('. return "INVALID"\n');
  } else {
    if (options['strip-whitespace'] === true) {
      rules.push('\\s+ // ignore');
    }
    rules.push('"' + options.delimiter + '" return "DELIMITER"');

    if (options['ignore-quotes'] !== true) {
      rules.push('\\"(?:[^"\\\\]|\\\\.)*\\"  return "QUOTED"');
      rules.push("\\'(?:[^'\\\\]|\\\\.)*\\'  return 'SINGLEQUOTED'");
    }
    rules.push('[^' + options.delimiter + ']+ return "UNQUOTED"');
    rules.push('<<EOF>> return "EOF"');
    rules.push('. return "INVALID"\n');
  }

  /*
  %start expressions

  %%

  expressions
      : parser EOF
          { return $1; }
      ;

  delimiter
      : DELIMITER
          { $$ = 1; }
      | DELIMITER delimiter
          { $$ = $2 + 1; }
      ;

  parser
      : QUOTED
          { $$ = [ $1.slice(1, -1) ]; }
      | SINGLEQUOTED
          { $$ = [ $1.slice(1, -1) ]; }
      | UNQUOTED
          { $$ = [ $1 ]; }
      | QUOTED delimiter parser
          { $3.unshift($1.slice(1, -1)); $$ = $3; }
      | SINGLEQUOTED delimiter parser
          { $3.unshift($1.slice(1, -1)); $$ = $3; }
      | UNQUOTED delimiter parser
          { $3.unshift($1); $$ = $3; }
      ;
  */

  // entry expression
  var expressions = "%start expressions\n\n%%\n\nexpressions\n    : parser EOF\n        { return $1 }\n    ;\n\n";

  // delimiter work
  var delimiter = "delimiter\n    : DELIMITER\n        { $$ = 1; }\n    | DELIMITER delimiter\n        { $$ = $2 + 1; }\n    ;\n\n";

  // actual parser
  var parser;
  if (options['ignore-quotes'] === true) {
    parser = "parser\n    : UNQUOTED\n        { $$ = [ $1 ]; }\n    | UNQUOTED delimiter parser\n        { $3.unshift($1); $$ = $3; }\n    ;\n\n";
  } else {
    parser = 'parser\n    : QUOTED\n        { $$ = [ $1.slice(1, -1) ]; }\n    | SINGLEQUOTED\n        { $$ = [ $1.slice(1, -1) ]; }\n';
    parser += '    | UNQUOTED\n        { $$ = [ $1 ]; }\n    | QUOTED delimiter parser\n        { $3.unshift($1.slice(1, -1)); $$ = $3; }\n';
    parser += '    | SINGLEQUOTED delimiter parser\n        { $3.unshift($1.slice(1, -1)); $$ = $3; }\n    | UNQUOTED delimiter parser\n        { $3.unshift($1); $$ = $3; }\n    ;\n\n';
  }

  var grammar = "%lex\n%%\n" + rules.join("\n") + "/lex\n\n" + expressions + delimiter + parser;

  return jison.Parser(grammar);
}

module.exports = exports = parser;
