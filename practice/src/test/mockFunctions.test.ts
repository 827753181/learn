test("testMockFn", () => {
  const mockFn = jest.fn((x, _index) => 43 + x);

  function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
      callback(items[index], index);
    }
  }
  forEach([0, 2], mockFn);
  expect(mockFn.mock.calls.length).toBe(2);
  expect(mockFn.mock.calls[0][0]).toBe(0);
  expect(mockFn.mock.calls[1][1]).toBe(1);
  expect(mockFn.mock.results[0].value).toBe(43);
});
test("testMockFnTrack", () => {
  const myMock = jest.fn();

  const a = new myMock();
  const b = {};
  const bound = myMock.bind(b);
  bound();

  console.log(myMock.mock.instances);
});
