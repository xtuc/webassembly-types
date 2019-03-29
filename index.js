function ensureRange(value, min, max) {
  if (value < min || value > max) {
    throw new RangeError(`value ${value} should be between ${min} and ${max}`);
  }
}

function i32(value = 0) {
  ensureRange(value, -0x7FFFFFFF, 0x7FFFFFFF);
  return {
    valueOf() {
      return value | 0;
    }
  };
}

function i64(v = 0) {
  let value;

  if (typeof v === "number") {
    ensureRange(v, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    value = BigInt(v.toString());
  } else {
    value = BigInt(v);
    ensureRange(value, -0x7FFFFFFFFFFFFFFF, 0x7FFFFFFFFFFFFFFF);
  }

  return {
    valueOf() {
      return value;
    }
  };
}

function f32(value = 0) {
  return {
    valueOf() {
      return value;
    }
  };
}

function f64(value = 0) {
  ensureRange(value, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  return {
    valueOf() {
      return value;
    }
  };
}

module.exports = { i32, i64, f32, f64 };
