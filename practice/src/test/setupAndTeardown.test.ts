import { createPromise } from "./testUtil";
let cityDataBase: number | Object[] = [];
const initializeCityDatabase = () =>
  createPromise("res", (cityDataBase = [1, 2, 3, 4, 1, 1, 12, { a: 22 }]), 100);
const clearCityDatabase = () => (cityDataBase = []);

// beforeEach(() => {
//   return initializeCityDatabase(); //this return a promise
// });

// afterEach(() => {
//   return clearCityDatabase(); //this return a promise
// });
beforeAll(() => {
  return initializeCityDatabase(); //this return a promise
});

afterAll(() => {
  return clearCityDatabase(); //this return a promise
});


//顶层模块的会在其他模块前执行
// beforeAll(() => console.log('1 - beforeAll'));
// afterAll(() => console.log('1 - afterAll'));
// beforeEach(() => console.log('1 - beforeEach'));
// afterEach(() => console.log('1 - afterEach'));
// describe('Scoped / Nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'));
//   afterAll(() => console.log('2 - afterAll'));
//   beforeEach(() => console.log('2 - beforeEach'));
//   afterEach(() => console.log('2 - afterEach'));
// });

test("testSetup", () => {
  expect(cityDataBase).toContain(1);
  expect(cityDataBase).toContainEqual({ a: 22 });
});
