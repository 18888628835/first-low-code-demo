/*
 * @Author: 邱彦兮
 * @Date: 2022-04-13 23:25:56
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-14 10:00:17
 * @FilePath: /first-low-code-demo/components/DndContainer/index.tsx
 */
/*
 * @Author: 邱彦兮
 * @Date: 2022-04-13 22:08:53
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-13 23:23:52
 * @FilePath: /first-low-code-demo/components/DnDContainer.tsx
 */
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import * as ItemTypes from '@/pages/ItemTypes';

const DnDContainer: React.FC<any> = props => {
  const { id, index, moveItem, findItem, type } = props;
  // 提供了一种将组件作为拖动源连接到 React-dnd 系统中的方法
  // useDrag接受 sepc（规范）返回collect 返回的对象
  // drag是 dragSource Ref 拖动源的连接器，连接真实 DOM 和 React Dnd 系统
  let [{ opacity }, drag, preview] = useDrag({
    type: ItemTypes.DnDItem,
    // item 是必须的，必须是一个函数或者对象，用于描述拖动源的普通JS对象
    item: () => ({ id, index, type }),
    // 收集功能，用来收集属性的，返回一个 JS 对象，并且返回值会合并到组件属性中
    // monitor是监听器，里面存放拖动的状态，当拖动状态发生变化时，会通知组件重新获取属性并进行刷新页面
    collect: monitor => ({
      // 根据当前对象是否被拖动设置拖动时的 style
      opacity: monitor.isDragging() ? 0 : 1,
    }),
    // 当拖拽结束后触发 end 回调
    end: (item, monitor) => {
      // 用户有没有真的完成【放下】的动作,真放下了为 true
      const didDrop = monitor.didDrop();
      // 这里的 item 是 item 属性里面的
      const { id: droppedId, index } = item;

      if (!didDrop) {
        console.log('didDrop', didDrop);
        moveItem(droppedId, index);
      }
    },
  });

  let [, drop] = useDrop({
    // 被放置目标接受类型
    accept: ItemTypes.DnDItem,
    // 当拖动源拖动到它身上时，会触发它的hover事件
    hover(item: any, monitor) {
      // item 里面保存着被拖动的数据
      const dragId = item.id;
      // id 是当前组件的即被拖动组件的 id
      if (dragId !== id) {
        const { targetIndex } = findItem(id);
        moveItem(dragId, targetIndex);
      }
    },
  });

  return (
    <div style={{ opacity }} ref={node => drag(drop(node))}>
      {props.children}
    </div>
  );
};

export default DnDContainer;
