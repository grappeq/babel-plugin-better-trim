# babel-plugin-better-trim

Tired of regular boring String.prototype.trim() function? Would you like your trim to trim anything, not just whitespaces?
You've come to the right place! 

### How does it work?
During compilation lodash.trim function is put at the top of the output as `__better_trim__`. Usages of String.prototype.trim() that have at least 1 argument  are replaced with `__better_trim__`.

### Is it useful?
Probably not, I would recommend just using [lodash.trim](https://www.npmjs.com/package/lodash.trim) instead.
Nevertheless, I wanted to play a little bit with writing babel plugins and this seemed like a good place to start.

## Example

**In**

```js
const s = "0002112300".trim("0");
```

**Out**

```js
function __better_trim__(string, chars, guard) {
  string = toString(string);if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }if (!string || !(chars = baseToString(chars))) {
    return string;
  }var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;return castSlice(strSymbols, start, end).join('');
}const s = __better_trim__("0002112300", "0");
```

## Installation

```sh
$ npm install babel-plugin-better-trim
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["better-trim"]
}
```

### Via CLI

```sh
$ babel --plugins better-trim script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["better-trim"]
});
```
