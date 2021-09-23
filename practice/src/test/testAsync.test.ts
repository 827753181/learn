import { createPromise } from "./testUtil";

test("callbacks", (done) => {
  function cb() {
    try {
      done();
    } catch (err) {
      // If we want to see in the test log why it failed,
      // we have to wrap expect in a try block and pass the error in the catch block to done.
      // Otherwise, we end up with an opaque timeout error that doesn't show what value
      // was received by expect(data).
      done(err);
    }
  }
  setTimeout(cb, 200);
});

test("promises", () => {
  return createPromise("res", "testaaa").then((str) =>
    expect(str).toBe("testaaa")
  );
});
test("the promises fails with an error", () => {
  expect.assertions(1);
  return createPromise("rej", "testErr").catch((e) => {
    expect(e).toMatch("testErr");
  });
});
test(".resolves", () => {
  return expect(createPromise("res", "resolves")).resolves.toBe("resolves");
});

test(".rejects", () => {
  return expect(createPromise("rej", "rejects")).rejects.toBe("rejects");
});

test("async await", async () => {
  const data = await createPromise("res", "testSuc", 200);
  expect(data).toBe("testSuc");

  try {
    await createPromise("rej", "testErr", 200);
  } catch (e) {
    expect(e).toBe("testErr");
  }
});

test("combine async and await with .resolves or .rejects.", async () => {
  await expect(createPromise("res", "peanut butter", 200)).resolves.toBe(
    "peanut butter"
  );
  await expect(createPromise("rej", "error", 200)).rejects.toMatch("error");
});
