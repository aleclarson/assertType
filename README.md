
# assertType v2.0.2 ![stable](https://img.shields.io/badge/stability-stable-4EBA0F.svg?style=flat)

Also compatible with any [`Validator`](https://github.com/aleclarson/Validator).

```coffee
assertType = require "assertType"

assertType 0, Number               # Nothing happens!

assertType 0, Boolean              # An error is thrown!

assertType 0, [ Number, Boolean ]  # Works with multiple possible types!
```
