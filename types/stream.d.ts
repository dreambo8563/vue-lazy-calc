import { LazyCalc } from "./main";
declare class LazyStream {
    private operators;
    private compose;
    private clone(operators);
    constructor();
    add(y: LazyCalc): LazyStream;
    default(fallback: any): LazyStream;
    value(): any;
}
export default LazyStream;
