import ss from './index.less';
import React from 'react';
import { animationTime } from './config';
import { useJumpHook } from './hook/roadHook';
import DtModal, { useModal } from './component/modal';
import DtFloatLayout, { useFloatLayout } from './component/floatLayout';

export default function() {
  const { jumpIndex, setJumpIndexWithAnimation, dimensionalMatrix, left, top } = useJumpHook();
  const modal = useModal();
  const float = useFloatLayout();
  return (
    <div className={ss.page}>
      <div className={ss.header}>
        <div className={ss.left}>
          <div className={ss.circle}>
            <span className={ss.circleImg}></span>
          </div>
          <div className={ss.textBlock} onClick={() => setJumpIndexWithAnimation(jumpIndex + 5)}>
            <span className={ss.text}>2323</span>
          </div>
        </div>
        <div className={ss.right}>游戏规则</div>
      </div>
      <div className={ss.body}>
        <div className={ss.gameRoad}>
          <div
            className={ss.peopleImg}
            style={{ left, top, transition: `all ${animationTime}ms ease-in-out` }}
          ></div>
          {dimensionalMatrix.map(ele =>
            ele.map(elem => (
              <div
                key={elem.xIdx + elem.yIdx}
                className={`${ss.col} ${'empty' === elem.type ? ss.isEmpty : ss.hasItem}`}
              >
                {'empty' === elem.type ? null : `row:${elem.xIdx} col:${elem.yIdx}`}
              </div>
            )),
          )}
        </div>
      </div>
      <div className={ss.footer}>
        <div className={ss.left} onClick={() => float.show()}>
          <div className={ss.restTime}>剩X次{/* TODO -- 剩余定点X次 */}</div>
          <div className={ss.fixedPointDice}></div>
          <div className={ss.bottomDesc}>{1 ? '指定步数' : '购买'}</div>
        </div>
        <div
          className={ss.center}
          onClick={() => {
            modal.show({
              type: 'rollDice',
              onClickConfirm: () => {},
            });
          }}
        >
          <div className={ss.dice}></div>
          <div className={ss.bottomDesc}>
            <div className={ss.leftHeart}>X{/* TODO -- 剩余X次 */}</div>
            {1 ? '体力已满' : 'time后次数加一'}
          </div>
          <div className={ss.hand}></div>
        </div>
        <div className={ss.right}></div>
      </div>
      <DtModal {...modal.props} maskCloseAble>
        1
      </DtModal>
      <DtFloatLayout {...float.props} maskCloseAble>
        <div className={ss.content}>1124214214214</div>
      </DtFloatLayout>
    </div>
  );
}
