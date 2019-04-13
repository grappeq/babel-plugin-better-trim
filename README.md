# babel-plugin-better-trim
***This was just made for fun, do not use this in production.***

Tired of regular boring [`String.prototype.trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) function? Would you like your trim to trim anything, not just whitespaces?
You've come to the right place!

This babel plugin replaces regular trim with a much cooler one that can do stuff like this:
```js
"0002.137300".trim("0"); // "2.137"
"seaseaseaseaislandseaseasea".trim("sea"); // "island"
```
without losing the boring classic feature:
```js
"  Hello world!   ".trim(); // "Hello world!"
```

### How does it work?
During compilation `__better_trim__` function is put at the top of the output. Usages of `String.prototype.trim()` that have at least 1 argument  are replaced with `__better_trim__`.

### Is it useful?
No, it's better to just import [lodash.trim](https://www.npmjs.com/package/lodash.trim) instead or, if you really like `"010".trim("0")` syntax, override `String.prototype.trim`.
Nevertheless, I wanted to play a little bit with writing babel plugins and this seemed like a good place to start.

## Example

**In**

```js
const s = "0002112300".trim("0");
```

**Out**

```js
function __better_trim__(str, chars) {
  if (typeof chars !== "string") {
    return str.trim();
  }var regex = new RegExp("^(" + chars + ")+|(" + chars + ")+$", "g");return str.replace(regex, '');
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
