import { operatorFunc, CalcMethod } from "./main";
import { LazyCalc } from "./simple";

class LazyStream {
  private operators: operatorFunc[];
  private compose = (fns: operatorFunc[]) =>
    fns.reduceRight(
      (prevFn: Function, nextFn: Function) => (...args: any[]) =>
        nextFn(prevFn(...args)),
      (i: any) => i
    );
  private clone(operators: operatorFunc[]) {
    let tmp = new LazyStream();
    tmp.operators = operators;
    return tmp;
  }
  private isInvalid(x: number | string) {
    return Number.isNaN(+x) || !Number.isFinite(+x);
  }
  private createRound(methodName: CalcMethod, precision: number = 0) {
    const func = <operatorFunc>Math[methodName];
    return (number: number | string): number => {
      // const _number = number.value()
      if (this.isInvalid(number) || this.isInvalid(precision)) {
        return NaN;
      }
      precision =
        precision == null
          ? 0
          : precision >= 0
          ? Math.min(precision, 292)
          : Math.max(precision, -292);
      if (precision) {
        // Shift with exponential notation to avoid floating-point issues.
        // See [MDN](https://mdn.io/round#Examples) for more details.
        let pair = `${number}e`.split("e");
        const value = func(`${pair[0]}e${+pair[1] + precision}`);

        pair = `${value}e`.split("e");
        return +`${pair[0]}e${+pair[1] - precision}`;
      }
      return func(number);
    };
  }
  constructor() {
    this.operators = [];
    return this;
  }

  add(y: LazyCalc): LazyStream {
    const operation = (x: number | string) => {
      const _y = y.value();
      if (this.isInvalid(x) || this.isInvalid(_y)) {
        return NaN;
      }
      return +x + +_y;
    };
    return this.clone([operation, ...this.operators]);
  }

  subtract(y: LazyCalc): LazyStream {
    const _y = y.value();
    const operation = (x: number | string) => {
      if (this.isInvalid(x) || this.isInvalid(_y)) {
        return NaN;
      }
      return +x - +_y;
    };
    return this.clone([operation, ...this.operators]);
  }
  multiply(y: LazyCalc): LazyStream {
    const _y = y.value();
    const operation = (x: number | string) => {
      if (this.isInvalid(x) || this.isInvalid(_y)) {
        return NaN;
      }
      return +x * +_y;
    };
    return this.clone([operation, ...this.operators]);
  }
  divide(y: LazyCalc): LazyStream {
    const _y = y.value();
    const operation = (x: number | string) => {
      if (this.isInvalid(x) || this.isInvalid(_y)) {
        return NaN;
      }
      return +x / +_y;
    };
    return this.clone([operation, ...this.operators]);
  }

  round(precision: number = 0): LazyStream {
    const operation = this.createRound("round", precision);
    return this.clone([operation, ...this.operators]);
  }
  ceil(precision: number = 0): LazyStream {
    const operation = this.createRound("ceil", precision);
    return this.clone([operation, ...this.operators]);
  }
  floor(precision: number = 0): LazyStream {
    const operation = this.createRound("floor", precision);
    return this.clone([operation, ...this.operators]);
  }
  do(fn: Function): LazyStream {
    const operation = function(y: number | string) {
      return fn(y);
    };
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }
  default(fallback: any): LazyStream {
    const operation = (x: number | string) => {
      return this.isInvalid(x) ? fallback : +x;
    };
    return this.clone([operation, ...this.operators]);
  }

  value(): any {
    return this.compose(this.operators)(0);
  }
}

export default LazyStream;
