/*
 * @Author: 邱彦兮
 * @Date: 2022-04-13 17:22:00
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-15 17:15:34
 * @FilePath: /first-low-code-demo/components/ButtonController/index.tsx
 */
import React, { useRef, useState } from 'react';
import Button from '../Button';
import styles from '@/styles/Home.module.css';
import { BaseButtonProps } from '../Button/types';
import classNames from 'classnames';
interface ButtonControllerProps {
  id: number;
  removeControlItem: (id: number) => void;
}
let allBtnType: Array<BaseButtonProps['btnType']> = [
  'danger',
  'default',
  'primary',
];
const ButtonController: React.FC<ButtonControllerProps> = props => {
  const { id, removeControlItem } = props;
  let index = id % allBtnType.length;
  const [hiddenRemoveIcon, setHiddenRemoveIcon] = useState(true);
  const iconClasses = classNames(styles.basic_delete_icon, {
    [styles.show_delete_icon]: !hiddenRemoveIcon,
  });
  const wrapClasses = classNames('animate__animated', 'animate__flipInX', {
    [styles.button_controller]: !hiddenRemoveIcon,
  });
  return (
    <div className={wrapClasses} style={{ padding: '10px' }}>
      <div
        onClick={() => {
          removeControlItem(id);
        }}
        className={iconClasses}
      >
        x
      </div>
      <Button
        block
        btnType={allBtnType[index]}
        onClick={() => {
          setHiddenRemoveIcon(!hiddenRemoveIcon);
        }}
        size='large'
      >
        提交{id}
      </Button>
    </div>
  );
};

export default ButtonController;
