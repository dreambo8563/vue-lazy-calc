import Vue, { VueConstructor } from "vue";
import LazyStream from "./stream";
import { LazyCalc } from "./simple";
export type operatorFunc = (i: number | string) => number;
export type CalcMethod = "ceil" | "floor" | "round";

export class LazyBase {
  constructor() {}
  static lazy(init: number | object = 0): LazyCalc {
    return new LazyCalc(init);
  }
  static stream(s?: LazyCalc): LazyStream {
    return s ? new LazyStream().add(s) : new LazyStream();
  }
}

export type LzCalcPlugin = {
  install(vue: VueConstructor<Vue>, options?: any): void;
};
const instantce: LzCalcPlugin = {
  install(vue, options) {
    let alias = "$lzCalc";
    vue.prototype[alias] = LazyBase;
    Object.defineProperty(Vue, `${alias}`, {
      get() {
        return LazyBase;
      }
    });
  }
};
export default instantce;
