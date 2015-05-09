# CSV Parser Generator

An extremely simple and fast CSV parser generator.  This is meant to be a building block for CSV parsers.

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
