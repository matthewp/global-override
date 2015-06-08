
module.exports = override;

function override(names, definer){
  var parts = names.split(".");
  var cur = global;

  next();

  function next(){
    var name = parts.shift();
    var obj;

    if(cur[name]) {
      if(parts.length) {
        cur = cur[name];
        next();
        return;
      }

      applyNewValue(name);
      return;
    }

    if(cur[name] && typeof value === "function") {
      var prev = cur[name];
      cur[name] = function(){
        var args = [].slice.call(arguments);
        args.unshift(prev);
        return value.apply(this, args);
      };
      return;
    }

    Object.defineProperty(cur, name, {
      get: function(){
        return obj;
      },

      set: function(val){
        obj = val;

        if(parts.length) {
          cur = obj;
          next();
        } else {
          applyNewValue(name);
        }
      }
    });
  }

  function applyNewValue(name){
    var previousValue = cur[name];
    cur[name] = definer(previousValue);
  }
}
