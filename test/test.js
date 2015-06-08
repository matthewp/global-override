var override = require("../override");
var assert = require("assert");

describe("global-override", function(){

  it("allows you to override stuff", function(){

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

    assert.equal(global.something.deep(), "bar", "it was overidden");

  });
});
