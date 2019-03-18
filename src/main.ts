import Vue, { VueConstructor } from "vue";
type operatorFunc = (i: number | string) => number;
type CalcMethod = "ceil" | "floor" | "round";
class LazyCalc {
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
    this.initValue = init || 0;
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
  ceil(precision: number = 0): LazyCalc {
    const operation = this.createRound("ceil", precision);
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }
  floor(precision: number = 0): LazyCalc {
    const operation = this.createRound("floor", precision);
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }
  round(precision: number = 0): LazyCalc {
    const operation = this.createRound("round", precision);
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }
  value(fallback: any = 0) {
    const result = this.compose(this.operators)(this.initValue);
    this.initValue = 0;
    return Number.isNaN(result) ? fallback : result;
  }
}

interface ILazyCalc {
  lazy(init?: number): ILazyCalc;
  add(number: number): ILazyCalc;
  subtract(number: number): ILazyCalc;
  divide(y: number): ILazyCalc;
  multiply(y: number): ILazyCalc;
  round(precision?: number): ILazyCalc;
  floor(precision?: number): ILazyCalc;
  ceil(precision?: number): ILazyCalc;
  value(fallback?: any): any;
}
export type LzCalcPlugin = {
  install(vue: VueConstructor<Vue>, options?: any): void;
};
const instantce: LzCalcPlugin = {
  install(vue, options) {
    let alias = "$lzCalc";
    const p = new LazyCalc(options) as ILazyCalc;
    vue.prototype[alias] = p;
    Object.defineProperty(Vue, `${alias}`, {
      get() {
        return p;
      }
    });
  }
};
export default instantce;
export { ILazyCalc };
