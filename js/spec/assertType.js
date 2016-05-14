var assertType;

assertType = require("../src/assertType");

describe("assertType()", function() {
  it("throws when the value is not the given type", function() {
    return expect(function() {
      return assertType(0, Boolean);
    }).toThrowError("Expected a Boolean!");
  });
  it("has no side effects when the value is the given type", function() {
    return expect(function() {
      return assertType(0, Number);
    }).not.toThrow();
  });
  it("accepts an optional key to identify the failure", function() {
    return expect(function() {
      return assertType([], Object, "array");
    }).toThrowError("'array' must be an Object!");
  });
  it("works with arrays of types", function() {
    expect(function() {
      return assertType(0, [Boolean, String, Number]);
    }).not.toThrow();
    return expect(function() {
      return assertType(0, [Object, Function]);
    }).toThrowError("Expected an Object or Function!");
  });
  return it("works with Validators", function() {
    var Foo, Validator;
    Validator = require("Validator");
    Foo = Validator({
      assert: function() {
        return Error("Validation failed!");
      }
    });
    return expect(function() {
      return assertType(0, Foo);
    }).toThrowError("Validation failed!");
  });
});

//# sourceMappingURL=../../map/spec/assertType.map
