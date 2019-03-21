import { operatorFunc } from "./main";
export declare class LazyCalc {
    initValue: number | object;
    operators: operatorFunc[];
    private compose;
    private createRound(methodName, precision?);
    private isInvalid(x);
    constructor(init?: number | object);
    private clone(operators);
    add(y: number): LazyCalc;
    divide(y: number): LazyCalc;
    subtract(y: number): LazyCalc;
    multiply(y: number): LazyCalc;
    do(fn: Function): LazyCalc;
    ceil(precision?: number): LazyCalc;
    floor(precision?: number): LazyCalc;
    round(precision?: number): LazyCalc;
    default(fallback: any): LazyCalc;
    value(): any;
}
