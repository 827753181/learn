import { useRef, useState } from 'react';
import { DimensionalMatrix, itemType, dimensionalMatrixType, delay } from '../utils';
import { isEmpty } from 'lodash';
import { matrixInfo, animationTime } from '../config';
import { useDebounceFn } from 'ahooks';

export function getPosition(
  dimensionalMatrix: DimensionalMatrix,
  jumpIndex: number,
  item: { width: any; height: any; rowGap: any; columnGap: any },
): positionInfo | {} {
  const { width, height, rowGap, columnGap } = item;
  let jumpItem: itemType = null!;
  dimensionalMatrix.mapArrs((ele: itemType) => ele.idx === jumpIndex && (jumpItem = ele));
  if (jumpItem !== null) {
    //idx从0开始计数
    let xIdx = jumpItem.xIdx,
      yIdx = jumpItem.yIdx,
      xGap = columnGap * Math.max(xIdx, 0),
      yGap = rowGap * Math.max(yIdx, 0);
    return {
      jumpItem,
      left: xIdx * width + xGap + width / 2,
      top: yIdx * height + yGap + height / 2,
    };
  }
  return {};
}
export function useJumpHook(): {
  jumpIndex: number;
  setJumpIndexWithAnimation: Function;
  dimensionalMatrix: dimensionalMatrixType;
  left?: number;
  top?: number;
} {
  const [jumpIndex, setJumpIndex] = useState<number>(0);
  const dimensionalMatrix = useRef(new DimensionalMatrix());
  let matrix = dimensionalMatrix.current;
  let positionInfo = getPosition(
    matrix,
    jumpIndex >= matrix.length ? jumpIndex % matrix.length : jumpIndex,
    matrixInfo.item,
  );

  return {
    jumpIndex,
    setJumpIndexWithAnimation: async (val: number) => {
      let curIndex = jumpIndex;
      while (val > curIndex) {
        setJumpIndex(++curIndex);
        await delay(animationTime);
      }
    },
    dimensionalMatrix: matrix.arrs,
    ...(isEmpty(positionInfo) ? {} : positionInfo),
  };
}
export type positionInfo = {
  left: number;
  top: number;
  jumpItem: itemType;
};
