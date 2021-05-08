import React, { ReactChild, EventHandler, useState } from 'react';
import ss from './index.less';
import { noop } from 'lodash';
//import IconFont from "@src/components/DtIcon";

type Props = {
  visible?: boolean;
  onClose?: Function;
  children?: ReactChild;
  maskCloseAble?: boolean;
};
type useFnResult = {
  show: Function;
  hidden: Function;
  props: Props;
};
const defaultP: Partial<Props> = {
  visible: false,
};
export default function DtFloatLayout(props: Props) {
  const { children, onClose, visible, maskCloseAble } = props;
  return (
    <div className={`${ss.floatLayout} ${visible ? ss.visible : ss.hidden}`}>
      <div
        className={ss.mask}
        onClick={maskCloseAble ? (onClose as EventHandler<any>) : noop}
      ></div>
      <div className={ss.container}>
        <div className={ss.header}>
          <div className={ss.left}>
            <div className={ss.title}></div>
            <div className={ss.subTitle}></div>
          </div>
          <div className={ss.right}>
            <div className={ss.coinImg}></div>
            {/*  <IconFont
              onClick={onClose as EventHandler<any>}
              color='white'
              style={{ transform: "rotate(180deg)" }}
              type='shanchu'
            ></IconFont> */}
          </div>
        </div>
        <div className={ss.content}>{children}</div>
      </div>
    </div>
  );
}

export const useFloatLayout = (): useFnResult => {
  const [props, setProps] = useState<Props>(defaultP);
  return {
    show: (props: Props = {}) => {
      setProps({ ...defaultP, ...props, visible: true });
    },
    hidden: (props: Props = {}) => {
      setProps({ ...defaultP, ...props, visible: false });
    },
    props: {
      onClose: () => setProps({ ...props, ...defaultP }),
      ...props,
    },
  };
};
