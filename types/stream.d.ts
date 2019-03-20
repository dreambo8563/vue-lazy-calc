import { operatorFunc } from "./main";
import { LazyCalc } from "./simple";
declare class LazyStream {
    private operators;
    private compose;
    private clone(operators);
    private createRound(methodName, precision?);
    constructor();
    add(y: LazyCalc): LazyStream;
    subtract(y: LazyCalc): LazyStream;
    multiply(y: LazyCalc): LazyStream;
    divide(y: LazyCalc): LazyStream;
    round(precision?: number): LazyStream;
    ceil(precision?: number): LazyStream;
    floor(precision?: number): LazyStream;
    do(fn: operatorFunc): LazyStream;
    default(fallback: any): LazyStream;
    value(): any;
}
export default LazyStream;
