
{ throwFailure } = require "failure"

isConstructor = require "isConstructor"
Validator = require "Validator"
wrongType = require "wrongType"
isType = require "isType"

module.exports = (value, type, key) ->

  if isConstructor key, Object
    meta = key
    key = meta.key
  else
    meta = { key }

  unless type
    error = Error "'assertType' expects a (value, type, key) argument list!"
    error.skip = 1
    throwFailure error, { value, type, key, meta }

  if type instanceof Validator
    result = type.assert value, key
    return unless result
    meta.value = value
    meta.type = type
    error = unwrapError meta, result

  else
    return unless isType value, type
    meta.value = value
    meta.type = type
    error = wrongType type, key

  error.skip ?= 1
  error.skip += 1
  throwFailure error, meta
  return

unwrapError = (meta, result) ->

  if result instanceof Error
    return result

  if result.meta
    for key, value of result.meta
      meta[key] = value

  return result.error
