var Validator, isConstructor, isType, throwFailure, unwrapError, wrongType;

throwFailure = require("failure").throwFailure;

isConstructor = require("isConstructor");

Validator = require("Validator");

wrongType = require("wrongType");

isType = require("isType");

module.exports = function(value, type, key) {
  var error, meta, result;
  if (isConstructor(key, Object)) {
    meta = key;
    key = meta.key;
  } else {
    meta = {
      key: key
    };
  }
  if (!type) {
    error = Error("'assertType' expects a (value, type, key) argument list!");
    error.skip = 1;
    throwFailure(error, {
      value: value,
      type: type,
      key: key,
      meta: meta
    });
  }
  if (type instanceof Validator) {
    result = type.assert(value, key);
    if (!result) {
      return;
    }
    meta.value = value;
    meta.type = type;
    error = unwrapError(meta, result);
  } else {
    if (!isType(value, type)) {
      return;
    }
    meta.value = value;
    meta.type = type;
    error = wrongType(type, key);
  }
  if (error.skip == null) {
    error.skip = 1;
  }
  error.skip += 1;
  throwFailure(error, meta);
};

unwrapError = function(meta, result) {
  var key, ref, value;
  if (result instanceof Error) {
    return result;
  }
  if (result.meta) {
    ref = result.meta;
    for (key in ref) {
      value = ref[key];
      meta[key] = value;
    }
  }
  return result.error;
};

//# sourceMappingURL=../../map/src/assertType.map
