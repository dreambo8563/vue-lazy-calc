type operatorFunc = (i: number | string) => number;
interface Math {
  [key: string]: any; // Add index signature
}
class LazyCalc {
  initValue: number = 0;
  operators: operatorFunc[];
  private compose = (fns: operatorFunc[]) =>
    fns.reduceRight(
      (prevFn: Function, nextFn: Function) => (...args: any[]) =>
        nextFn(prevFn(...args)),
      (i: any) => i
    );
  private createRound(methodName: string, precision: number = 0) {
    const func: operatorFunc = Math[methodName];
    return function(number: number | string): number {
      console.log(methodName, number);
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

  clone(operators: operatorFunc[]) {
    let tmp = new LazyCalc(this.initValue);
    tmp.operators = operators;
    return tmp;
  }
  lazy(init?: number): LazyCalc {
    return new LazyCalc(init);
  }

  add(y: number): LazyCalc {
    const operation = function(x: number | string) {
      console.log("add");
      console.log("x:", x, "y:", y);
      return +x + +y;
    };

    return this.clone([operation, ...this.operators]);
  }
  divide(y: number): LazyCalc {
    const operation = function(x: number | string) {
      console.log("divide");
      console.log("x:", x, "y:", y);
      return +x / +y;
    };
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }

  subtract(y: number): LazyCalc {
    const operation = function(x: number | string) {
      console.log("subtract");
      console.log("x:", x, "y:", y);
      return +x - +y;
    };
    // this.operators.unshift(operation);
    return this.clone([operation, ...this.operators]);
  }
  multiply(y: number): LazyCalc {
    const operation = function(x: number | string) {
      console.log("multiply");
      console.log("x:", x, "y:", y);
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
    console.log("result:", result);
    this.initValue = 0;
    return Number.isNaN(result) ? fallback : result;
  }
}

const instance = new LazyCalc();

const a = instance.add(10).multiply(2);

const b = a.subtract(13).value(null);
const c = a.divide(2).value();

console.log(`b: ${b}`, `c: ${c}`);
