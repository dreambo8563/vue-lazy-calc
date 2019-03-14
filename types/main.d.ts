declare type operatorFunc = (i: number | string) => number;
interface Math {
    [key: string]: any;
}
declare class LazyCalc {
    initValue: number;
    operators: operatorFunc[];
    private compose;
    private createRound;
    constructor(init?: number);
    clone(operators: operatorFunc[]): LazyCalc;
    lazy(init?: number): LazyCalc;
    add(y: number): LazyCalc;
    divide(y: number): LazyCalc;
    subtract(y: number): LazyCalc;
    multiply(y: number): LazyCalc;
    ceil(precision?: number): LazyCalc;
    floor(precision?: number): LazyCalc;
    round(precision?: number): LazyCalc;
    value(fallback?: any): any;
}
declare const instance: LazyCalc;
declare const a: LazyCalc;
declare const b: any;
declare const c: any;
