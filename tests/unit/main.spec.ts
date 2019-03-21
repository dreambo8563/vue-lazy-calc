import { LazyBase } from "../../src/main";

describe("base class", () => {
  it("lazy with init value", () => {
    const base = LazyBase.lazy(1);
    expect(base.value()).toBe(1);
  });
  it("add", () => {
    const base = LazyBase.lazy(1).add(4);
    expect(base.value()).toBe(5);
  });

  it("subtract", () => {
    const base = LazyBase.lazy(1).subtract(4);
    expect(base.value()).toBe(-3);
  });

  it("multiply", () => {
    const base = LazyBase.lazy(1).multiply(4);
    expect(base.value()).toBe(4);
  });
  it("multiply - float", () => {
    const base = LazyBase.lazy(1.5).multiply(4);
    expect(base.value()).toBe(6);
  });

  it("divide - round", () => {
    const base = LazyBase.lazy(1.5)
      .divide(2)
      .round(2);
    expect(base.value()).toBe(0.75);
  });

  it("divide - floor", () => {
    const base = LazyBase.lazy(1.5)
      .divide(2)
      .floor(1);
    expect(base.value()).toBe(0.7);
  });
  it("divide - ceil", () => {
    const base = LazyBase.lazy(1.5)
      .divide(2)
      .ceil(1);
    expect(base.value()).toBe(0.8);
  });
  it("default", () => {
    const base = LazyBase.lazy(1.5)
      .divide(0)
      .default(99);
    expect(base.value()).toBe(99);
  });

  it("do", () => {
    const base = LazyBase.lazy({ num: 1.5 })
      .do((x: { num: number }) => x.num)
      .multiply(2);
    expect(base.value()).toBe(3);
  });
});
