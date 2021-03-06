import { LazyCalc } from "./simple";
declare class LazyStream {
    private operators;
    private compose;
    private clone(operators);
    private isInvalid(x);
    private createRound(methodName, precision?);
    constructor();
    add(y: LazyCalc): LazyStream;
    subtract(y: LazyCalc): LazyStream;
    multiply(y: LazyCalc): LazyStream;
    divide(y: LazyCalc): LazyStream;
    round(precision?: number): LazyStream;
    ceil(precision?: number): LazyStream;
    floor(precision?: number): LazyStream;
    do(fn: Function): LazyStream;
    default(fallback: any): LazyStream;
    value(): any;
}
export default LazyStream;
