import Vue, { VueConstructor } from "vue";
import LazyStream from "./stream";
export type operatorFunc = (i: number | string) => number;
type CalcMethod = "ceil" | "floor" | "round";
export class LazyCalc {
  initValue: number = 0;
  operators: operatorFunc[];
  private compose = (fns: operatorFunc[]) =>
    fns.reduceRight(
      (prevFn: Function, nextFn: Function) => (...args: any[]) =>
        nextFn(prevFn(...args)),
      (i: any) => i
    );
  private createRound(methodName: CalcMethod, precision: number = 0) {
    const func = <operatorFunc>Math[methodName];
    return function(number: number | string): number {
      if (Number.isNaN(+number) || Number.isNaN(+precision)) {
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
  constructor(init?: number) {
    this.initValue = Number.isNaN(init || NaN) ? NaN : init || 0;
    this.operators = [];
    return this;
  }

  private clone(operators: operatorFunc[]) {
    let tmp = new LazyCalc(this.initValue);
    tmp.operators = operators;
    return tmp;
  }
  lazy(init?: number): LazyCalc {
    return new LazyCalc(init);
  }

  add(y: number): LazyCalc {
    const operation = function(x: number | string) {
      if (Number.isNaN(+x) || Number.isNaN(+y)) {
        return NaN;
      }
      return +x + +y;
    };

    return this.clone([operation, ...this.operators]);
  }
  divide(y: number): LazyCalc {
    const operation = function(x: number | string) {
      if (Number.isNaN(+x) || Number.isNaN(+y)) {
        return NaN;
      }
      return +x / +y;
    };
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }

  subtract(y: number): LazyCalc {
    const operation = function(x: number | string) {
      if (Number.isNaN(+x) || Number.isNaN(+y)) {
        return NaN;
      }
      return +x - +y;
    };
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }
  multiply(y: number): LazyCalc {
    const operation = function(x: number | string) {
      if (Number.isNaN(+x) || Number.isNaN(+y)) {
        return NaN;
      }
      return +x * +y;
    };
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }
  do(fn: operatorFunc): LazyCalc {
    const operation = function(y: number | string) {
      return fn(+y);
    };
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }
  ceil(precision: number = 0): LazyCalc {
    const operation = this.createRound("ceil", precision);
    return this.clone([operation, ...this.operators]);
  }
  floor(precision: number = 0): LazyCalc {
    const operation = this.createRound("floor", precision);
    return this.clone([operation, ...this.operators]);
  }
  round(precision: number = 0): LazyCalc {
    const operation = this.createRound("round", precision);
    return this.clone([operation, ...this.operators]);
  }
  stream(s: LazyCalc): LazyStream {
    return new LazyStream().add(s);
  }
  default(fallback: any): LazyCalc {
    const operation = function(x: number | string) {
      return Number.isNaN(+x) ? fallback : x;
    };
    return this.clone([operation, ...this.operators]);
  }
  value(): any {
    return this.compose(this.operators)(this.initValue);
  }
}

export type LzCalcPlugin = {
  install(vue: VueConstructor<Vue>, options?: any): void;
};
const instantce: LzCalcPlugin = {
  install(vue, options) {
    let alias = "$lzCalc";
    const p = new LazyCalc(options);
    vue.prototype[alias] = p;
    Object.defineProperty(Vue, `${alias}`, {
      get() {
        return p;
      }
    });
  }
};
export default instantce;
