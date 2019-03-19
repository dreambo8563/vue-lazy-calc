[![Codacy Badge](https://api.codacy.com/project/badge/Grade/842028f156034786bad7a874b7fa513f)](https://app.codacy.com/app/dreambo8563/vue-lazy-calc?utm_source=github.com&utm_medium=referral&utm_content=dreambo8563/vue-lazy-calc&utm_campaign=Badge_Grade_Dashboard)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://travis-ci.com/dreambo8563/vue-lazy-calc.svg?branch=master)](https://travis-ci.com/dreambo8563/vue-lazy-calc) [![Greenkeeper badge](https://badges.greenkeeper.io/dreambo8563/vue-lazy-calc.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/dreambo8563/vue-lazy-calc/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dreambo8563/vue-lazy-calc?targetFile=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![npm type definitions](https://img.shields.io/npm/types/vue-lazy-calc.svg?style=flat)
![npm](https://img.shields.io/npm/dt/vue-lazy-calc.svg?style=flat)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdreambo8563%2Fvue-lazy-calc.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdreambo8563%2Fvue-lazy-calc?ref=badge_shield)

# vue-lazy-calc

![](https://raw.githubusercontent.com/dreambo8563/static-assets/master/calculator.jpg)

this is a just support simple calculation in lazy way.
(inspired by lodash)

**features**

- vue friendly
- strong typed
- lazy evaluation
- chaining methods

### TODO

- [] seperate simple lazy class and base class
- [] support more operator in stream api

### Install

```cmd
npm install vue-lazy-calc --save
```

### Quick Start

```js
import lzCalc from "vue-lazy-calc"
Vue.use(lzCalc)
```

### Methods

- this.\$lzCalc in Component context.
- Vue.\$lzCalc in global.

### API list

```ts
interface LazyCalc {
  lazy(init?: number): LazyCalc
  add(y: number): LazyCalc
  divide(y: number): LazyCalc
  subtract(y: number): LazyCalc
  multiply(y: number): LazyCalc
  do(fn: operatorFunc): LazyCalc
  ceil(precision?: number): LazyCalc
  floor(precision?: number): LazyCalc
  round(precision?: number): LazyCalc
  stream(s: LazyCalc): LazyStream
  default(fallback: any): LazyCalc
  value(): any
}
```

- lazy => init a new instance with optional initValue
- add/subtract/divide/multiple => + - \* / (simple calculation) between numbers
- round/floor/ceil => deal with precision of the float number
- value => excute the declared method chain
- default => set default value if previous operations get NaN
- do => accept a custormized function for the number
- stream => init a stream to operate between multiple lazy instance with optional init instantce

#### Stream

```ts
declare class LazyStream {
  add(y: LazyCalc): LazyStream
  default(fallback: any): LazyStream
  value(): any
}
```

- add

```js
const result = this.$lzCalc
  .lazy(1)
  .add(3)
  .multiply(2)
  .divide(3)
  .round(2)

const tmp = this.$lzCalc.lazy(2).add(3)
const s = this.$lzCalc.stream(result).add(tmp)

console.log(s.value()) // 2.67 + 5 => 7.67
```

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

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdreambo8563%2Fvue-lazy-calc.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdreambo8563%2Fvue-lazy-calc?ref=badge_large)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://dreambo8563.github.io/"><img src="https://avatars2.githubusercontent.com/u/6948318?v=4" width="100px;" alt="Vincent Guo"/><br /><sub><b>Vincent Guo</b></sub></a><br /><a href="https://github.com/dreambo8563/vue-lazy-calc/commits?author=dreambo8563" title="Code">💻</a> <a href="https://github.com/dreambo8563/vue-lazy-calc/commits?author=dreambo8563" title="Documentation">📖</a> <a href="#infra-dreambo8563" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
