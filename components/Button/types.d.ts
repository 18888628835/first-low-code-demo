/*
 * @Author: 邱彦兮
 * @Date: 2022-03-08 21:40:30
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-15 17:15:49
 * @FilePath: /first-low-code-demo/components/Button/types.d.ts
 */

export type BaseButtonProps = {
  /**
   * @description 类名
   */
  className: string;
  /**
   * @description 禁止
   * @default false
   */
  disabled: boolean;
  /**
   * @description 尺寸
   * @default 'default'
   */
  size: 'large' | 'small';
  /**
   * @description 类型样式
   * @default 'default'
   */
  btnType: 'primary' | 'default' | 'danger' | 'link';
  children: React.ReactNode;
  /**
   * @description 同 a 标签的 href 属性
   */
  href: string;
  /**
   * @description 边框模式
   */
  variant: 'outline';
  /**
   * @description 铺满
   */
  block: boolean;
};
