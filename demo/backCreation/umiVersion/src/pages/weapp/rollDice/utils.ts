import { cloneDeep } from 'lodash';
import DtEnum from '@/utils/DtEnum';
import { matrixInfo } from './config';

type gameEventTypeEnum = 'share' | 'answer' | 'barricades' | 'giftBag' | 'base' | 'start' | 'empty';
export type itemType = {
  xIdx: number;
  yIdx: number;
  idx: number;
  type: gameEventTypeEnum;
};
export const rectTypeEnum = new DtEnum([
  ['empty', [-3, '藏着的砖头啊']],
  ['start', [-2, '就起点啊']],
  ['base', [-1, '就普通砖块啊??']],
  ['share', [0, '分享事件']],
  ['answer', [1, '答题事件']],
  ['barricades', [2, '路障事件']],
  ['giftBag', [3, '礼包事件']],
]);

type mapObjType = {
  [key: string]: {
    type?: gameEventTypeEnum;
    idx: number;
  };
};
export type dimensionalMatrixType = Array<Array<itemType>>;
export type mapFnType = (arg0: any, arg1: number, arg2: number) => void;
export type filterFnType = (arg0: any, arg1: number, arg2: number) => boolean;
export class DimensionalMatrix {
  arrs: dimensionalMatrixType;
  length: number;
  constructor() {
    const { arrs, length } = this.createArrs();
    this.arrs = arrs;
    this.length = length;
  }
  mapArrs(fn: mapFnType) {
    let arrs = cloneDeep(this.arrs);
    for (let i = 0; i < arrs.length; i++) {
      for (let j = 0; j < arrs[i].length; j++) {
        fn(arrs[i][j], i, j);
      }
    }
    return arrs;
  }
  someArrs(fn: filterFnType) {
    let isPass = false;
    this.mapArrs((...args) => {
      if (isPass) {
        return;
      }
      isPass = fn(...args);
    });
    return isPass;
  }
  everyArrs(fn: filterFnType) {
    let isPass = true;
    this.mapArrs((...args) => {
      if (!isPass) {
        return;
      }
      isPass = fn(...args);
    });
    return isPass;
  }
  createArrs() {
    let arrs = new Array(matrixInfo.rowNum);
    for (let i = 0; i < matrixInfo.rowNum; i++) {
      arrs[i] = [];
      for (let j = 0; j < matrixInfo.columnNum; j++) {
        arrs[i][j] = {
          xIdx: j,
          yIdx: i,
          type: 'empty',
          idx: -1,
        };
      }
    }
    let mapObj: mapObjType = {
      '0,2': {
        type: 'giftBag',
        idx: 7,
      },
      '0,3': {
        type: 'answer',
        idx: 8,
      },
      '0,4': {
        type: 'base',
        idx: 9,
      },
      '0,5': {
        type: 'answer',
        idx: 10,
      },
      '0,6': {
        type: 'base',
        idx: 11,
      },
      '1,2': {
        type: 'barricades',
        idx: 6,
      },
      '1,6': {
        type: 'base',
        idx: 12,
      },
      '2,0': {
        type: 'answer',
        idx: 3,
      },
      '2,1': {
        type: 'base',
        idx: 4,
      },
      '2,2': {
        type: 'base',
        idx: 5,
      },
      '2,6': {
        type: 'giftBag',
        idx: 13,
      },
      '3,0': {
        type: 'base',
        idx: 2,
      },
      '3,4': {
        type: 'giftBag',
        idx: 16,
      },
      '3,5': {
        type: 'barricades',
        idx: 15,
      },
      '3,6': {
        type: 'base',
        idx: 14,
      },
      '4,0': {
        type: 'giftBag',
        idx: 1,
      },
      '4,4': {
        type: 'base',
        idx: 17,
      },
      '5,0': {
        type: 'start',
        idx: 0,
      },
      '5,3': {
        type: 'giftBag',
        idx: 19,
      },
      '5,4': {
        type: 'answer',
        idx: 18,
      },
      '6,0': {
        type: 'answer',
        idx: 23,
      },
      '6,1': {
        type: 'base',
        idx: 22,
      },
      '6,2': {
        type: 'giftBag',
        idx: 21,
      },
      '6,3': {
        type: 'base',
        idx: 20,
      },
    };
    for (let key in mapObj) {
      let [i, j] = key.split(',').map((ele) => parseInt(ele));
      arrs[i][j] = {
        ...arrs[i][j],
        ...mapObj[key],
      };
    }
    return { length: 24, arrs };
  }
}
export const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));
