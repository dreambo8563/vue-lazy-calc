import { LazyBase } from "../../src/main";

describe("simple class", () => {
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

  it("precision - invalid", () => {
    const base = LazyBase.lazy(1.5)
      .divide(0)
      .ceil(1)
      .default("m");
    expect(base.value()).toBe("m");
  });

  it("precision - minus", () => {
    const base = LazyBase.lazy(1.5)
      .divide(1)
      .ceil(-2)
      .default("m");
    expect(base.value()).toBe(100);
  });

  it("precision - without", () => {
    const base = LazyBase.lazy(1.5)
      .divide(1)
      .ceil()
      .default("m");
    expect(base.value()).toBe(2);
  });

  it("precision - null", () => {
    const base = LazyBase.lazy(1.5)
      .divide(1)
      .ceil(null)
      .default("m");
    const base1 = LazyBase.lazy(1.5)
      .divide(1)
      .ceil(0)
      .default("m");
    expect(base.value()).toEqual(base1.value());
  });

  it("default", () => {
    const base = LazyBase.lazy(1.5)
      .divide(0)
      .default(99);
    expect(base.value()).toBe(99);
  });

  it("add with invalid", () => {
    const base = LazyBase.lazy(1.5)
      .divide(0)
      .add(6)
      .default(99);
    expect(base.value()).toBe(99);
  });

  it("subtract with invalid", () => {
    const base = LazyBase.lazy(1.5)
      .divide(0)
      .subtract(6)
      .default(99);
    expect(base.value()).toBe(99);
  });

  it("divide with invalid", () => {
    const base = LazyBase.lazy(1.5)
      .divide(0)
      .divide(6)
      .default(99);
    expect(base.value()).toBe(99);
  });

  it("multiply with invalid", () => {
    const base = LazyBase.lazy(1.5)
      .divide(0)
      .multiply(6)
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
