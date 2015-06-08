# global-override

Override a global value, even if it has not been set yet.

## Install

```
npm install global-override --save
```

## Use

Use this module to override a global value.  For example you could do:

```js
var override = require("global-override");

override("something.deep", function(oldFn){
  return function(){
    return "bar";
  };
});

global.something = {
  deep: function(){
    return "foo";
  }
};
```

This will override `global.something.deep` to return the string "bar" instead of "foo".

This is useful if you have some deep object that you want to override that might not be defined right away.  global-override will wait for the object to be defined and then hook it so that you can override it yourself.
