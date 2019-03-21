import { operatorFunc, CalcMethod } from "./main"

export class LazyCalc {
  initValue: number | object = 0
  operators: operatorFunc[]
  private compose = (fns: operatorFunc[]) =>
    fns.reduceRight(
      (prevFn: Function, nextFn: Function) => (...args: any[]) =>
        nextFn(prevFn(...args)),
      (i: any) => i
    )
  private createRound(methodName: CalcMethod, precision: number = 0) {
    const func = <operatorFunc>Math[methodName]
    return (number: number | string): number => {
      if (this.isInvalid(number) || this.isInvalid(precision)) {
        return NaN
      }
      precision =
        precision == null
          ? 0
          : precision >= 0
          ? Math.min(precision, 292)
          : Math.max(precision, -292)
      if (precision) {
        // Shift with exponential notation to avoid floating-point issues.
        // See [MDN](https://mdn.io/round#Examples) for more details.
        let pair = `${number}e`.split("e")
        const value = func(`${pair[0]}e${+pair[1] + precision}`)

        pair = `${value}e`.split("e")
        return +`${pair[0]}e${+pair[1] - precision}`
      }
      return func(number)
    }
  }
  private isInvalid(x: number | string) {
    return Number.isNaN(+x) || !Number.isFinite(+x)
  }
  constructor(init: number | object = 0) {
    this.initValue = init
    this.operators = []
    return this
  }

  private clone(operators: operatorFunc[]) {
    let tmp = new LazyCalc(this.initValue)
    tmp.operators = operators
    return tmp
  }

  add(y: number): LazyCalc {
    const operation = (x: number | string) => {
      if (this.isInvalid(x) || this.isInvalid(y)) {
        return NaN
      }
      return +x + +y
    }

    return this.clone([operation, ...this.operators])
  }
  divide(y: number): LazyCalc {
    const operation = (x: number | string) => {
      if (this.isInvalid(x) || this.isInvalid(y)) {
        return NaN
      }
      return +x / +y
    }
    return this.clone([operation, ...this.operators])
  }

  subtract(y: number): LazyCalc {
    const operation = (x: number | string) => {
      if (this.isInvalid(x) || this.isInvalid(y)) {
        return NaN
      }
      return +x - +y
    }
    return this.clone([operation, ...this.operators])
  }
  multiply(y: number): LazyCalc {
    const operation = (x: number | string) => {
      if (this.isInvalid(x) || this.isInvalid(y)) {
        return NaN
      }
      return +x * +y
    }
    return this.clone([operation, ...this.operators])
  }
  do(fn: Function): LazyCalc {
    const operation = function(y: number | string | object) {
      return fn(y)
    }
    return this.clone([operation, ...this.operators])
  }
  ceil(precision: number = 0): LazyCalc {
    const operation = this.createRound("ceil", precision)
    return this.clone([operation, ...this.operators])
  }
  floor(precision: number = 0): LazyCalc {
    const operation = this.createRound("floor", precision)
    return this.clone([operation, ...this.operators])
  }
  round(precision: number = 0): LazyCalc {
    const operation = this.createRound("round", precision)
    return this.clone([operation, ...this.operators])
  }

  default(fallback: any): LazyCalc {
    const operation = (x: number | string) => {
      return this.isInvalid(x) ? fallback : x
    }
    return this.clone([operation, ...this.operators])
  }
  value(): any {
    return this.compose(this.operators)(this.initValue)
  }
}
