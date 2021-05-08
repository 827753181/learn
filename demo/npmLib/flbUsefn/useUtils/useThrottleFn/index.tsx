import throttle from "lodash.throttle";
import { useRef } from "@tarojs/taro";
import useCreation from "../useCreation";
import useThrottleOtherFn from "./useThrottleOtherFn";
export type Fn = (...args: any) => any;
export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}
export interface ReturnValue<T extends Fn> {
  run: T;
  cancel: () => void;
}

function useThrottleFn<T extends Fn>(fn: T, options?: ThrottleOptions): ReturnValue<T> {
  const fnRef = useRef<Fn>(fn);
  fnRef.current = fn;

  const wait = options ? options.wait : 1000;

  const throttled = useCreation(
    () =>
      throttle(
        (...args: any) => {
          fnRef.current(...args);
        },
        wait,
        options
      ),
    []
  );

  return {
    run: (throttled as any) as T,
    cancel: throttled.cancel,
  };
}
export { useThrottleOtherFn };
export default useThrottleFn;
