///<reference path="../../types/main.d.ts">
///<reference path="../../types/vue.d.ts">
import LazyPlugin, { LazyBase } from "../../src/main";
import Vue from "vue";

describe("base class", () => {
  it("lazy with init value", () => {
    const base = LazyBase.lazy(1);
    expect(base.value()).toBe(1);
  });
  it("stream with init value", () => {
    const base1 = LazyBase.lazy(1);
    const base2 = LazyBase.lazy(4);
    const stream1 = LazyBase.stream(base1).add(base2);
    expect(stream1.value()).toBe(5);
  });
  it("stream without init value", () => {
    const base1 = LazyBase.lazy(1);
    const base2 = LazyBase.lazy(4);
    const stream1 = LazyBase.stream()
      .subtract(base1)
      .add(base2);
    expect(stream1.value()).toBe(3);
  });
  it("Vue instantce", () => {
    Vue.use(LazyPlugin);
    const base1 = Vue.$lzCalc.lazy(1);
    const base2 = Vue.$lzCalc.lazy(4);
    const stream1 = Vue.$lzCalc.stream(base1).add(base2);
    expect(stream1.value()).toBe(5);
  });
});
