import { useState, useRef, useEffect } from "@tarojs/taro";
import useUpdateEffect from "@src/util/useRequest/utils/useUpdateEffect";


const useFirstLoading = (loading) => {
  const fistLoadingRef = useRef(false);

  const [firstLoading, setFirstLoading] = useState(false);
  useEffect(() => {
    fistLoadingRef.current = false;
  }, []);
  useEffect(() => {
    if(fistLoadingRef.current && loading) return;
    setFirstLoading(loading);
    if ( loading) {
      fistLoadingRef.current = true;
    }
  }, [loading]);
  return {
    firstLoading,
    setFirstLoading,
  };
};
export default useFirstLoading;
