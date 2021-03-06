/*
 * @Author: 邱彦兮
 * @Date: 2022-04-13 17:42:50
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-14 14:50:40
 * @FilePath: /first-low-code-demo/components/DragControlItem/index.tsx
 */
import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import styles from '@/styles/Home.module.css';
import * as ItemTypes from '@/pages/ItemTypes';
import { ControlsType } from '@/pages/index';
import { buttonPreview } from 'public/buttonPreview';

interface DragControlItemProps {
  text: string;
  type: ControlsType;
  index: number;
}
const DragControlItem: React.FC<DragControlItemProps> = props => {
  const { text, type, index } = props;
  // 提供了一种将组件作为拖动源连接到 React-dnd 系统中的方法
  // useDrag接受 sepc（规范）返回collect 返回的对象
  // drag是 dragSource Ref 拖动源的连接器，连接真实 DOM 和 React Dnd 系统
  let [collectProps, drag, preview] = useDrag({
    type: ItemTypes.DragControlItem,
    // item 是必须的，必须是一个函数或者对象，用于描述拖动源的普通JS对象
    item: () => ({ text, index, type }),
    // 收集功能，用来收集属性的，返回一个 JS 对象，并且返回值会合并到组件属性中
    // monitor是监听器，里面存放拖动的状态，当拖动状态发生变化时，会通知组件重新获取属性并进行刷新页面
    collect: monitor => ({
      isDragging: monitor.isDragging(), //当前对象是否被拖动
    }),
    // 当拖拽结束后触发 end 回调
    end: (item, monitor) => {
      // 这里的 item 是 item 属性里面的
      // 用户有没有真的完成【放下】的动作,真放下了为 true
      const didDrop = monitor.didDrop();

      if (!didDrop) {
        console.log('didDrop', didDrop);
      }
    },
  });
  // 拖动时的 style
  const opacity = collectProps.isDragging ? 0.1 : 1;
  return (
    <>
      <DragPreviewImage connect={preview} src={buttonPreview} />
      <div
        ref={node => drag(node)}
        className={styles.control_item}
        style={{ opacity }}
      >
        {text}
      </div>
    </>
  );
};

export default DragControlItem;
