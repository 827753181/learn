type IEmumValue_Base = string | number;
type IEmumExtra = any;
type IEnumDefine<IEmumValue, IEmumDesc> = [IEmumValue, IEmumDesc, IEmumExtra?];
type IEnum<T_CODE, IEmumValue, IEmumDesc> = [T_CODE, IEnumDefine<IEmumValue, IEmumDesc>];

export type IEnumOption<IEmumValue, IEmumDesc> = {
  label?: IEmumDesc;
  value?: IEmumValue;
  key?: IEmumValue;
  extra?: any;
};

interface IValueEnum {
  [key: string]: {
    text: string;
    status?: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
    extra?: any;
  };
}

/**
 * 枚举定义工具
 * @example
 * ```jsx
 * const STATUS = new DtEnum([
 * ['AUDIT_WAIT', [1, '审核中']],
 * ['AUDIT_PASS', [2, '审核通过']]
 * ])
 * ```
 */
class DtEnum<T_CODE extends string, IEmumValue extends IEmumValue_Base, IEmumDesc extends string> {
  private byCodeMap: {
    [index: string]: {
      code: T_CODE;
      value: IEmumValue;
      desc: IEmumDesc;
      extra?: IEmumExtra;
    };
  } = {};

  private byValueMap: {
    [index: string]: {
      code: T_CODE;
      value: IEmumValue;
      desc: IEmumDesc;
      extra?: IEmumExtra;
    };
  } = {};

  private configList: IEnum<T_CODE, IEmumValue, IEmumDesc>[] = [];

  constructor(config: IEnum<T_CODE, IEmumValue, IEmumDesc>[]) {
    this.configList = config;
    config.forEach((item) => {
      const [code, [value, desc, extra]] = item;
      this.byCodeMap[code] = { code, value, desc, extra };
      this.byValueMap[String(value)] = { code, value, desc, extra };
    });
  }

  /**
   * 由code获取value
   * @param code
   */
  getValueByCode(code: T_CODE): IEmumValue | undefined {
    return this.byCodeMap[code]?this.byCodeMap[code].value:undefined;
  }

  /**
   * 由code获取desc
   * @param code
   */
  getDescByCode(code: T_CODE): IEmumDesc | undefined {
    return this.byCodeMap[code]?this.byCodeMap[code].desc:undefined;
  }

  /**
   * 由value获取desc
   * @param value
   */
  getDescByValue(value: IEmumValue): IEmumDesc | undefined {
    return this.byValueMap[value]?this.byValueMap[value].desc:undefined;
  }

  /**
   * 由code获取extra
   * @param code
   */
  getExtraByCode(code: T_CODE): IEmumExtra {
    return this.byCodeMap[code]?this.byCodeMap[code].extra:undefined;
  }

  /**
   * 获取所有values
   * @example
   * ```jsx
   * STATUS.getAllValues() // => [1,2]
   * ```
   */
  getAllValues() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.configList.map(([code, [value]]) => value);
  }

  /**
   * 转为form要使用的option
   * @example
   * STATUS.toFormOptions()
   */
  toFormOptions(
    hasAll: boolean = false,
  ): (IEnumOption<IEmumValue, IEmumDesc> | { key: null; value: null; label: string })[] {
    const allOption = {
      key: null,
      value: null,
      label: '全部',
      extra: null
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = this.configList.map(([code, [value, desc, extra]]) => {
      return {
        key: value,
        value,
        label: desc,
        extra,
      };
    });

    if (hasAll) {
      return [allOption, ...result];
    }
    return result;
  }

  /**
   * 转为antd pro table 需要的ValueEnum
   * @example
   * STATUS.toFormValueEnum()
   *
   * // return example
   * {
   *    1: {text: '审核中'}
   * }
   */
  toFormValueEnum(): IValueEnum {
    const result: IValueEnum = {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.configList.forEach(([code, [value, desc, extra]]) => {
      result[String(value)] = {
        text: desc,
        status: extra && extra.status,
        extra,
      };
    });
    return result;
  }

  /**
   * value与code对应值匹配
   * @example
   * STATUS.checkValueByCode('AUDIT_WAIT',1)
   */
  checkValueByCode(code: T_CODE, value: IEmumValue): boolean {
    const iValue = this.getValueByCode(code);
    return iValue === value;
  }
}

export default DtEnum;
export {
    DtEnum
}