import Vue, { VueConstructor } from "./vue";
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
export declare type LzCalcPlugin = {
  install(vue: VueConstructor<Vue>, options?: any): void;
};
declare const instantce: LzCalcPlugin;
export default instantce;
export { ILazyCalc };
