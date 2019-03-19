import { LazyCalc, operatorFunc } from "./main";

interface LazyStream {
  add(y: LazyCalc): LazyStream;
  default(fallback: any): LazyStream;
  value(): any;
}
class LazyStream {
  private operators: operatorFunc[];
  private compose = (fns: operatorFunc[]) =>
    fns.reduceRight(
      (prevFn: Function, nextFn: Function) => (...args: any[]) => {
        console.log(args);
        return nextFn(prevFn(...args));
      },
      (i: any) => i
    );
  private clone(operators: operatorFunc[]) {
    let tmp = new LazyStream();
    tmp.operators = operators;
    return tmp;
  }
  constructor() {
    this.operators = [];
    return this;
  }

  add(y: LazyCalc): LazyStream {
    const operation = function(x: number | string) {
      const _y = y.value();
      if (Number.isNaN(+x) || Number.isNaN(+_y)) {
        return NaN;
      }
      return +x + +_y;
    };
    return this.clone([operation, ...this.operators]);
  }
  default(fallback: any): LazyStream {
    const operation = function(x: number | string) {
      return Number.isNaN(+x) ? fallback : +x;
    };
    return this.clone([operation, ...this.operators]);
  }

  value(): any {
    return this.compose(this.operators)(0);
  }
}

export default LazyStream;
