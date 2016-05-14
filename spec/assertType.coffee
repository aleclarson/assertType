
assertType = require "../src/assertType"

describe "assertType()", ->

  it "throws when the value is not the given type", ->

    expect -> assertType 0, Boolean
      .toThrowError "Expected a Boolean!"

  it "has no side effects when the value is the given type", ->

    expect -> assertType 0, Number
      .not.toThrow()

  it "accepts an optional key to identify the failure", ->

    expect -> assertType [], Object, "array"
      .toThrowError "'array' must be an Object!"

  it "works with arrays of types", ->

    expect -> assertType 0, [ Boolean, String, Number ]
      .not.toThrow()

    expect -> assertType 0, [ Object, Function ]
      .toThrowError "Expected an Object or Function!"

  it "works with Validators", ->

    Validator = require "Validator"

    Foo = Validator
      assert: -> Error "Validation failed!"

    expect -> assertType 0, Foo
      .toThrowError "Validation failed!"
