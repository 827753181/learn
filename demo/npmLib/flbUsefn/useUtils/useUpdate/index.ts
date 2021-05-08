import { useCallback, useState } from '@tarojs/taro';

const useUpdate = () => {
  const [, setState] = useState(0);

  return useCallback(() => setState((num: number): number => num + 1), []);
};

export default useUpdate;