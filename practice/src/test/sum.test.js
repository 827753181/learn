const sum = require("./testUtil");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

/* 
will fail
test("testToBe  {a:1} to equal {a:1}", () => {
  expect({ a: 1 }).toBe({ a: 1 });
});
 */
test("testToEqual {a:1} to equal {a:1}", () => {
  expect({ a: 1 }).toEqual({ a: 1 });
});
