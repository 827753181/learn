import { foo } from "./importa.js";
export function bar() {
  let random = Math.random();
  if (random > 0.5) {
    console.log(random);
    foo();
  }
}
