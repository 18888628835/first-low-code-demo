/*
 * @Author: 邱彦兮
 * @Date: 2022-04-13 20:15:04
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-13 20:20:16
 * @FilePath: /first-low-code-demo/utils/uuid.ts
 */
let id = 0;
export function getUuid() {
  return ++id;
}
