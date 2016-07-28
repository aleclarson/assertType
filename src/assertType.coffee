
Validator = require "Validator"
wrongType = require "wrongType"
isType = require "isType"

module.exports = (value, type, key) ->

  if key? and typeof key isnt "string"
    console.warn "DEPRECATED: Third argument of 'assertType()' must be a String!"
    return

  if type instanceof Validator
    error = type.assert value, key
    throw error if error instanceof Error
    error and console.warn "DEPRECATED: 'Validator::assert' must return a kind of Error (or Void)!"
    return

  return if isType value, type
  throw wrongType type, key
