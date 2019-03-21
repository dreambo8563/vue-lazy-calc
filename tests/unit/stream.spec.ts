import { LazyBase } from "../../src/main";

describe("stream class", () => {
  it("stream add - invalid", () => {
    const base1 = LazyBase.lazy(1).divide(0);
    const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .add(base2)
        .value()
    ).toBeNaN();
  });

  it("stream subtract - invalid", () => {
    const base1 = LazyBase.lazy(1).divide(0);
    const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .subtract(base2)
        .value()
    ).toBeNaN();
  });

  it("stream multiply - invalid", () => {
    const base1 = LazyBase.lazy(1).divide(0);
    const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .multiply(base2)
        .value()
    ).toBeNaN();
  });
  it("stream multiply ", () => {
    const base1 = LazyBase.lazy(1).divide(4);
    const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .multiply(base2)
        .value()
    ).toBe(0.75);
  });

  it("stream divide - invalid", () => {
    const base1 = LazyBase.lazy(1).divide(0);
    const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .divide(base2)
        .value()
    ).toBeNaN();
  });

  it("stream divide", () => {
    const base1 = LazyBase.lazy(1).multiply(6);
    const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .divide(base2)
        .value()
    ).toBe(2);
  });

  it("stream round", () => {
    const base1 = LazyBase.lazy(1).divide(4);
    // const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .round(1)
        .value()
    ).toBe(0.3);
  });

  it("stream precision - invalid", () => {
    const base1 = LazyBase.lazy(1).divide(4);
    // const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .round(null)
        .value()
    ).toBe(0);
  });

  it("stream precision - invalid2", () => {
    const base1 = LazyBase.lazy(1).divide(4);
    // const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .round(NaN)
        .value()
    ).toBeNaN();
  });

  it("stream precision - minus", () => {
    const base1 = LazyBase.lazy(1).divide(4);
    // const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .round(-1)
        .value()
    ).toBe(0);
  });

  it("stream ceil", () => {
    const base1 = LazyBase.lazy(1).divide(4);
    // const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .ceil(1)
        .value()
    ).toBe(0.3);
  });

  it("stream floor", () => {
    const base1 = LazyBase.lazy(1).divide(4);
    // const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .floor(1)
        .value()
    ).toBe(0.2);
  });

  it("stream do", () => {
    const base1 = LazyBase.lazy(6);
    // const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .do(x => x + 10)
        .value()
    ).toBe(16);
  });

  it("stream default", () => {
    const base1 = LazyBase.lazy(1).divide(0);
    const base2 = LazyBase.lazy(3);
    expect(
      LazyBase.stream(base1)
        .divide(base2)
        .default(88)
        .value()
    ).toBe(88);
  });

  it("stream default - unused", () => {
    const base1 = LazyBase.lazy(1).multiply(8);
    const base2 = LazyBase.lazy(2);
    expect(
      LazyBase.stream(base1)
        .divide(base2)
        .default(88)
        .value()
    ).toBe(4);
  });
});
