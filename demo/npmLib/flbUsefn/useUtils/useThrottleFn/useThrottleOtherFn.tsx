import { useRef } from "@tarojs/taro";
import { ThrottleOptions, Fn } from "./index";

function useThrottleOtherFn<T extends Fn>(otherFn: T, fn: T, options?: ThrottleOptions) {
  const timeRef = useRef<number>(0);

  const wait = options ? options.wait : 1000;

  const throttled = () => {
    //@ts-ignore
    let isOverTime = Date.now() - timeRef.current > wait;
    isOverTime && (timeRef.current = Date.now());
    return !isOverTime ? otherFn() : fn();
  };
  return {
    run: throttled,
  };
}

export default useThrottleOtherFn;
