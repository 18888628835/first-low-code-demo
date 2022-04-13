/*
 * @Author: 邱彦兮
 * @Date: 2021-10-12 11:11:55
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-03-16 16:49:17
 * @FilePath: /Simpler-Components/src/Button/index.tsx
 */
import classnames from 'classnames';
import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { BaseButtonProps } from './types';
import { Wrap, WrapA } from './_styleButton';

//Partial 的作用就是可以将某个类型里的属性全部变为可选项 ?
export type ButtonProps = Partial<
  BaseButtonProps &
    // React提供的元素属性
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    disabled = false,
    size,
    btnType = 'default',
    children,
    href,
    variant,
    ...restProps
  } = props;
  // 默认为btn, 根据传入的BaseButtonProps可变成btn-primary,btn-large等
  const classes = classnames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    [`btn-${variant}`]: variant,
    disabled: btnType === 'link' && disabled,
    [className!]: className,
  });
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (button.current) {
      button.current.addEventListener('click', (e: MouseEvent) => {
        const { current } = button;
        const x = e.offsetX;
        const y = e.offsetY;
        const div = document.createElement('div');
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.className = 'wave';
        current!.appendChild(div);
        setTimeout(() => {
          current!.removeChild(div);
        }, 600);
      });
    }
  }, []);

  return btnType === 'link' ? (
    <WrapA>
      <a
        href={href}
        className={classes}
        {...restProps}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    </WrapA>
  ) : (
    <Wrap ref={button} className={classes} disabled={disabled} {...restProps}>
      <span>{children}</span>
    </Wrap>
  );
};
// 默认的 props
// Button.defaultProps = { disabled: false, btnType: "default" };
export default Button;
