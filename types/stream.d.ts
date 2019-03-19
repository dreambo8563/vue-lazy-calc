import { LazyCalc } from "./main";
interface LazyStream {
    add(y: LazyCalc): LazyStream;
    default(fallback: any): LazyStream;
    value(): any;
}
declare class LazyStream {
    private operators;
    private compose;
    private clone(operators);
    constructor();
}
export default LazyStream;
