import Vue, { VueConstructor } from "./vue";
import LazyStream from "./stream";
export declare type operatorFunc = (i: number | string) => number;
export declare class LazyCalc {
  initValue: number;
  operators: operatorFunc[];
  private compose;
  private createRound(methodName, precision?);
  constructor(init?: number);
  private clone(operators);
  lazy(init?: number): LazyCalc;
  add(y: number): LazyCalc;
  divide(y: number): LazyCalc;
  subtract(y: number): LazyCalc;
  multiply(y: number): LazyCalc;
  do(fn: operatorFunc): LazyCalc;
  ceil(precision?: number): LazyCalc;
  floor(precision?: number): LazyCalc;
  round(precision?: number): LazyCalc;
  stream(s: LazyCalc): LazyStream;
  default(fallback: any): LazyCalc;
  value(): any;
}
export declare type LzCalcPlugin = {
  install(vue: VueConstructor<Vue>, options?: any): void;
};
declare const instantce: LzCalcPlugin;
export default instantce;
