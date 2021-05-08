import { useEffect, useRef } from "@tarojs/taro";
import { every } from "lodash";

type Fn = (...args: any) => any;

function useAllChange<T extends Fn>(fn: T, deps: any[]): undefined {
  const createRef = (deps) => Array.from(deps).map((ele) => ({ value: ele, changed: false }));
  const changedArray = useRef(createRef(deps));

  useEffect(() => {
    let changedArrayList = changedArray.current;
    deps.forEach((ele, idx) => {
      if (ele !== changedArrayList[idx].value)
        changedArray.current[idx] = {
          value: ele,
          changed: true,
        };
    });
    if (every(changedArrayList, (item) => item.changed)) {
      changedArray.current.forEach((ele) => (ele.changed = false));
      return fn();
    }
  }, deps);
  return undefined;
}

export default useAllChange;
