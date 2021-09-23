test("testCommon", () => {
  expect(() => expect({ a: 1 }).toBe({ a: 1 })).toThrow();
  expect({ a: 1 }).toEqual({ a: 1 });
});
test("testNumber", () => {
  expect(1).toBe(1);
  expect(4).toEqual(4);
  expect(5).toBeGreaterThanOrEqual(4);
  expect(3).toBeLessThan(4);
  expect(4).toBeLessThanOrEqual(4);
  expect(0.1 + 0.2).toBeCloseTo(0.3); // This works.
});

test("testString", () => {
  expect("string").toMatch("string");
  expect("regString").toMatch(/^reg/);
  expect("Match").toMatch(/Match$/); //this  match
  // expect("notMatch").not.toMatch(/Match$/); //this not match
});

test("testTruthiness", () => {
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
  expect(null).toBeDefined();
  expect("true").toBeTruthy();
  expect(false).toBeFalsy();
});

test("testArr", () => {
  expect([1, 2, 3]).toContain(1);
});

test("testThrow", () => {
  const throwNewError = () => {
    throw new Error("testError");
  };

  expect(() => throwNewError()).toThrow();
  expect(() => throwNewError()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => throwNewError()).toThrow("testError");
  expect(() => throwNewError()).toThrow(/Error$/);
});
