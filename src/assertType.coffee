
Validator = require "Validator"
wrongType = require "wrongType"
isType = require "isType"

module.exports = (value, type, key) ->

  if key? and typeof key isnt "string"
    throw Error "'key' must be a string (or undefined)!"

  if type instanceof Validator
    error = type.assert value, key
    return if error is undefined
    throw error if error instanceof Error
    throw Error "'Validator::assert' must return an error (or undefined)!"

  return if isType value, type
  error = wrongType type, key
  throw error
