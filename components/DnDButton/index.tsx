/*
 * @Author: 邱彦兮
 * @Date: 2022-04-13 17:22:00
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-13 20:53:12
 * @FilePath: /first-low-code-demo/components/DnDButton/index.tsx
 */
import React from 'react';
import Button from '../Button';
import { BaseButtonProps } from '../Button/types';
interface DnDButtonProps {
  id: number;
}
let allBtnType: Array<BaseButtonProps['btnType']> = [
  'danger',
  'default',
  'primary',
];
const DnDButton: React.FC<DnDButtonProps> = props => {
  const { id } = props;
  let index = id % allBtnType.length;

  return (
    <div style={{ marginBottom: '10px', padding: '10px' }}>
      <Button btnType={allBtnType[index]} size='large'>
        提交{id}
      </Button>
    </div>
  );
};

export default DnDButton;
