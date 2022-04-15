/*
 * @Author: 邱彦兮
 * @Date: 2022-04-15 12:16:42
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-15 14:41:16
 * @FilePath: /first-low-code-demo/service/services.ts
 */
import axios from 'axios';

export async function _getButtons(path: string) {
  const res = await axios({
    method: 'get',
    url: path,
  });
  return res;
}

export async function _updateButtons(path: string, options: { data: unknown }) {
  const { data } = options;
  const res = await axios({
    method: 'post',
    url: path,
    data,
  });
  return res;
}
