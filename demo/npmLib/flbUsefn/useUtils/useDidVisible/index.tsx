import { useEffect, useDidShow } from "@tarojs/taro";


const useDidVisible = (fn) => {
  useDidShow(fn);
  useEffect(fn, [])
};
export default useDidVisible;
