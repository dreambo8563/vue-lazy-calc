# vue-lazy-calc

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/842028f156034786bad7a874b7fa513f)](https://app.codacy.com/app/dreambo8563/vue-lazy-calc?utm_source=github.com&utm_medium=referral&utm_content=dreambo8563/vue-lazy-calc&utm_campaign=Badge_Grade_Dashboard)

this is a just support simple calculation in lazy way.
(inspired by lodash)

**features**

- vue friendly
- strong typed
- lazy evaluation
- chaining methods

### Install

```cmd
npm install vue-lazy-calc --save
```

### Quick Start

```js
import device from "vue-lazy-calc"
Vue.use(device)
```

### Methods

- this.\$lzCalc in Component context.
- Vue.\$lzCalc in global.

### API list

```ts
interface ILazyCalc {
  lazy(init?: number): ILazyCalc
  add(number: number): ILazyCalc
  subtract(number: number): ILazyCalc
  divide(y: number): ILazyCalc
  multiply(y: number): ILazyCalc
  round(precision?: number): ILazyCalc
  floor(precision?: number): ILazyCalc
  ceil(precision?: number): ILazyCalc
  value(fallback?: any): any
}
```

- lazy => init a new instance with optional initValue
- add/subtract/divide/multiple => + - \* / (simple calculation)
- round/floor/ceil => deal with precision of the float number
- value => excute the declared method chain with optional fallBack value(if the result is NaN)

### Examples

(1+3)\*2/3 with precision 2

```js
const result = this.$lzCalc
  .lazy(1)
  .add(3)
  .multiply(2)
  .divide(3)
  .round(2)

console.log(result.value()) // 2.67

const addThree = result.add(3)
console.log(addThree.value()) // 2.67+ 3 =>5.67
```

1. when declare the result variable, no calculation excuted until value()
2. you can reuse the declare variable
