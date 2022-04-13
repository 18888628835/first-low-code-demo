/*
 * @Author: 邱彦兮
 * @Date: 2022-04-13 17:22:00
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-13 17:28:51
 * @FilePath: /first-low-code-demo/components/DnDButton/index.tsx
 */
import React from 'react';
interface DnDButtonProps {
  id: number;
}

const DnDButton: React.FC<DnDButtonProps> = props => {
  const { id } = props;
  return <button>提交 {id}</button>;
};

export default DnDButton;
