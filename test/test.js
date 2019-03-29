const lib = require("../index.js");
const assert = require("assert");

["i32", "f32", "f64", "i64"].forEach(type => {
  describe("basic " + type, () => {
    it("should be a function", () => {
      assert.equal(typeof lib[type], "function");
    });
    it("should return an instance", () => {
      assert.equal(typeof lib[type](), "object");
      assert.equal(typeof lib[type]().valueOf, "function");
    });

    it("should coerce to a number", () => {
      if (type === "i64") {
        assert.equal(lib[type](1).valueOf(), 1n);
        assert.equal(lib[type](100).valueOf(), 100n);
        assert.equal(lib[type](-100).valueOf(), -100n);
      } else {
        assert.equal(+lib[type](1), 1);
        assert.equal(+lib[type](100), 100);
        assert.equal(+lib[type](-100), -100);
      }
    });
    it("should coerce to a number with a typed zero", () => {
      if (type === "i64") {
        assert.equal(lib[type]().valueOf(), 0n);
      } else {
        assert.equal(+lib[type](), 0);
      }
    });
  });
});

describe("i32", () => {
  it("should ensure range", () => {
    assert.ok(lib.i32(0x7FFFFFFF));
    assert.throws(() => lib.i32(0xFFFFFFFF), RangeError);
    assert.throws(() => lib.i32(0xFFFFFFFFFF), RangeError);
  });
});

describe("f64", () => {
  it("should ensure range", () => {
    assert.ok(lib.f64(Number.MAX_SAFE_INTEGER));
    assert.throws(() => lib.f64(Number.MAX_VALUE), RangeError);
  });
});

describe("i64", () => {
  it("should accept number", () => {
    assert.ok(lib.i64(1));
    assert.equal(lib.i64(1).valueOf(), 1n);
  });
  it("should ensure type", () => {
    assert.ok(lib.i64("1"));
    assert.ok(lib.i64(1n));
    assert.ok(lib.i64(BigInt("1")));
  });

  it("should ensure range", () => {
    assert.ok(lib.i64(0x7FFFFFFF));
    assert.throws(() => lib.i64(0xFFFFFFFFFFFFFFFFn), RangeError);
    assert.throws(() => lib.i64(0xFFFFFFFFFFFFFFFFFFFn), RangeError);
  });
});
