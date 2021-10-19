[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.4.0)](https://badge.fury.io/js/number-locale-string)


# number-locale-string

## Install

`npm install --save number-locale-string`


## Using

```javascript
const numberLocal = require('number-locale-string');

let value = 1200.00;

// valueString = '1.200'
let valueString = numberLocal.toLocaleString(value, 'pt-BR');

// currencyString = R$1.200,00
let currencyString = numberLocal.toLocaleString(value, 'pt-BR', { style: 'currency', currency: 'brl' });
```
