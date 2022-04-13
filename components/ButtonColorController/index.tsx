/*
 * @Author: 邱彦兮
 * @Date: 2022-04-13 17:22:00
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-13 23:30:18
 * @FilePath: /first-low-code-demo/components/ButtonColorController/index.tsx
 */
import React from 'react';
import Button from '../Button';
import { BaseButtonProps } from '../Button/types';
interface ButtonColorControllerProps {
  id: number;
}
let allBtnType: Array<BaseButtonProps['btnType']> = [
  'danger',
  'default',
  'primary',
];
const ButtonColorController: React.FC<ButtonColorControllerProps> = props => {
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

export default ButtonColorController;
