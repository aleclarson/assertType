var Validator, isType, wrongType;

Validator = require("Validator");

wrongType = require("wrongType");

isType = require("isType");

module.exports = function(value, type, key) {
  var error;
  if ((key != null) && typeof key !== "string") {
    throw Error("'key' must be a string (or undefined)!");
  }
  if (type instanceof Validator) {
    error = type.assert(value, key);
    if (error === void 0) {
      return;
    }
    if (error instanceof Error) {
      throw error;
    }
    throw Error("'Validator::assert' must return an error (or undefined)!");
  }
  if (isType(value, type)) {
    return;
  }
  error = wrongType(type, key);
  throw error;
};

//# sourceMappingURL=map/assertType.map
