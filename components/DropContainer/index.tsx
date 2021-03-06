/*
 * @Author: 邱彦兮
 * @Date: 2022-04-13 19:48:56
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-14 09:37:06
 * @FilePath: /first-low-code-demo/components/DropContainer/index.tsx
 */
import { ControlsType } from '@/pages/index';
import * as ItemTypes from '@/pages/ItemTypes';
import React, { HTMLAttributes, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

interface DropContainerProps extends HTMLAttributes<HTMLDivElement> {
  moveControlItem: (type: ControlsType) => void;
}
// 页面拖放区域
const DropContainer: React.FC<DropContainerProps> = props => {
  const { moveControlItem, children, ...args } = props;

  let [_, drop] = useDrop({
    // 被放置目标接受类型
    accept: ItemTypes.DragControlItem,
    drop(item: any, monitor) {
      console.log(item);
      moveControlItem(item.type);
    },
  });

  return (
    <div
      {...{ ...args }}
      ref={node => drop(node)}
      style={{ height: '100%', position: 'relative' }}
    >
      {props.children}
    </div>
  );
};

export default DropContainer;
