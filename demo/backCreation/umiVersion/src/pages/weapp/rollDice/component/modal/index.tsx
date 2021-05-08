import React, { ReactChild, EventHandler, useState } from 'react';
import ss from './index.less';
import { noop } from 'lodash';
//import IconFont from "@src/components/DtIcon";

type Props = {
  visible?: boolean;
  type?: 'rollDice' | 'gameRule' | 'result';
  onClose?: Function;
  onClickConfirm?: Function;
  children?: ReactChild;
  confirmText?: string;
  canelText?: string;
  maskCloseAble?: boolean;
};
type useModalResult = {
  show: Function;
  hidden: Function;
  props: Props;
};
const defaultP: Partial<Props> = {
  visible: false,
  type: 'rollDice',
};
export default function DtModal(props: Props) {
  const {
    children,
    confirmText,
    canelText,
    onClose,
    onClickConfirm,
    type,
    visible,
    maskCloseAble,
  } = props;
  return (
    <div className={`${ss.modal} ${visible ? ss.visible : ss.hidden}`}>
      <div
        className={ss.mask}
        onClick={maskCloseAble ? (onClose as EventHandler<any>) : noop}
      ></div>
      <div className={`${ss.modalContainer} ${type ? ss[type] : undefined}`}>
        <div className={ss.modalContent}>
          {children}
          {confirmText && (
            <div className={ss.confirmBtn} onClick={onClickConfirm as EventHandler<any>}></div>
          )}
          {canelText && <div className={ss.canelBtn} onClick={onClose as EventHandler<any>}></div>}
        </div>
        <div className={ss.modalCloseBtn} onClick={onClose as EventHandler<any>}>
          {/*  <IconFont
              onClick={onClose as EventHandler<any>}
              color='white'
              style={{ transform: "rotate(180deg)" }}
              type='shanchu'
            ></IconFont> */}
        </div>
      </div>
    </div>
  );
}

export const useModal = (): useModalResult => {
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
