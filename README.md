[![npm version](https://badge.fury.io/js/number-locale-string.svg)](https://badge.fury.io/js/number-locale-string)


# number-locale-string

## Install

`npm install --save number-locale-string`


## Using

```javascript
const numberLocal = require('number-locale-string');

let value = 1200.00;

// valueString = '1.200'
let valueString = numberLocal.toLocalString(value, 'pt-BR');

// currencyString = R$1.200,00
let currencyString = numberLocal.toLocalString(value, 'pt-BR', { style: 'currency', currency: 'brl' });
```
