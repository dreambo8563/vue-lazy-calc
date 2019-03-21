import { LazyBase } from "../../src/main";

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
});
