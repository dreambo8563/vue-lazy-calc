import Vue, { VueConstructor } from "vue";
import LazyStream from "./stream";
import { LazyCalc } from "./simple";
export type operatorFunc = (i: number | string) => number;
export type CalcMethod = "ceil" | "floor" | "round";

export class LazyBase {
  constructor() {}
  lazy(init?: number): LazyCalc {
    return new LazyCalc(init);
  }
  stream(s?: LazyCalc): LazyStream {
    return s ? new LazyStream().add(s) : new LazyStream();
  }
}

export type LzCalcPlugin = {
  install(vue: VueConstructor<Vue>, options?: any): void;
};
const instantce: LzCalcPlugin = {
  install(vue, options) {
    let alias = "$lzCalc";
    const p = new LazyBase();
    vue.prototype[alias] = p;
    Object.defineProperty(Vue, `${alias}`, {
      get() {
        return p;
      }
    });
  }
};
export default instantce;
