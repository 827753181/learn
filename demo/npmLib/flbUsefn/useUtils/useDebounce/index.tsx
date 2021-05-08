import { useRef } from "@tarojs/taro";
import { debounce } from "lodash";

export default function useDebounce(fn, delay=300) {
  return useRef(debounce(fn, delay)).current;
}
