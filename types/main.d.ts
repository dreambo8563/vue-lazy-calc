import Vue, { VueConstructor } from "./vue";
import LazyStream from "./stream";
import { LazyCalc } from "./simple";
export declare type operatorFunc = (i: number | string) => number;
export declare type CalcMethod = "ceil" | "floor" | "round";
export interface ILazyBase {
  lazy(init?: number | object): LazyCalc;
  stream(s?: LazyCalc): LazyStream;
}
export declare class LazyBase {
  static lazy(init?: number | object): LazyCalc;
  static stream(s?: LazyCalc): LazyStream;
}
export declare type LzCalcPlugin = {
  install(vue: VueConstructor<Vue>, options?: any): void;
};
declare const instantce: LzCalcPlugin;
export default instantce;
