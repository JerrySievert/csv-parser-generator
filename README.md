# CSV Parser Generator

An extremely simple and fast CSV parser generator.  This is meant to be a building block for CSV parsers and other things that need to parse CSV.

This module generates a parser based on the arguments passed, which then will parse a single line, returning all fields it can find.

## Installing

```
$ npm install csv-parser-generator
```

## Usage

```js
var generator = require('csv-parser-generator');

var parser = generator({ delimiter: " " });
parser.parse('"foo bar" bar baz');
```

### Options

* `delimiter` - which delimiter to split on
* `strip-whitespace` - if this is set to true, will automatically strip any whitespace on either side of the column
* `ignore-quotes` - if this is set to true, parsing will completely ignore all quotation marks and not treat them as special containers of fields, e.g. "hello, world" would parse out as _"hello"_,_" world".
