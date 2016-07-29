var Validator, isType, wrongType;

Validator = require("Validator");

wrongType = require("wrongType");

isType = require("isType");

module.exports = function(value, type, key) {
  var error;
  if ((key != null) && typeof key !== "string") {
    console.warn("DEPRECATED: Third argument of 'assertType()' must be a String!");
    return;
  }
  if (type instanceof Validator) {
    error = type.assert(value, key);
    if (error instanceof Error) {
      throw error;
    }
    error && console.warn("DEPRECATED: 'Validator::assert' must return a kind of Error (or Void)!");
    return;
  }
  if (isType(value, type)) {
    return;
  }
  throw wrongType(type, key);
};

//# sourceMappingURL=map/assertType.map
