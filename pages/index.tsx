/*
 * @Author: 邱彦兮
 * @Date: 1985-10-26 16:15:00
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-14 14:40:25
 * @FilePath: /first-low-code-demo/pages/index.tsx
 */
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import ButtonController from '@/components/ButtonController';
import DragControlItem from '@/components/DragControlItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useCallback, useState } from 'react';
import DropContainer from '@/components/DropContainer';
import { getUuid } from '@/utils/uuid';
import DnDContainer from '@/components/DndContainer';
import { notification } from 'antd';

const strategy = {
  BUTTON: 'BUTTON',
};

export type ControlsType = keyof typeof strategy;
export type ControlsItem = { type: ControlsType; text: string };
export type DragListItem = { type: ControlsType; id: number };

const controlsList: Array<ControlsItem> = [
  { type: 'BUTTON', text: '按钮控件' },
];

const Home: NextPage = () => {
  const [dragList, setDragList] = useState<DragListItem[]>([]);

  // 查询某一个可被拖拽组件
  const findItem = useCallback(
    (id: number) => {
      const card = dragList.find(_card => _card.id === id)!;
      const cardIndex = dragList.indexOf(card);
      return {
        card,
        targetIndex: cardIndex,
      };
    },
    [dragList]
  );
  // 移动某一个可被拖拽组件
  const moveItem = useCallback(
    function (dragId: number, atIndex: number) {
      let { targetIndex, card } = findItem(dragId);
      let _dragList = [...dragList];

      _dragList.splice(targetIndex, 1);
      _dragList.splice(atIndex, 0, card);
      setDragList(_dragList);
    },
    [dragList, findItem]
  );
  // button数量校验器
  const ButtonCountValidator = useCallback(function (dragList: DragListItem[]) {
    let count = dragList.reduce((pre: number, cur) => {
      if (cur.type === 'BUTTON') {
        return (pre += 1);
      }
      return (pre += 0);
    }, 0);
    //低于 10 个
    let isLt10 = count < 10;
    if (!isLt10) {
      notification.open({
        message: '校验出错',
        description: '按钮控件最多不能超过 10 个',
      });
    }
    return isLt10;
  }, []);
  // 移动控件
  const moveControlItem = useCallback(
    (type: ControlsType) => {
      if (!ButtonCountValidator(dragList)) {
        return;
      }
      setDragList(oldState => {
        let _dragList = [...oldState, { type, id: getUuid() }];
        return _dragList;
      });
    },
    [ButtonCountValidator, dragList]
  );

  const removeControlItem = useCallback(
    (id: number) => {
      const { targetIndex } = findItem(id);
      setDragList(oldState => {
        let _dragList = [...oldState];
        _dragList.splice(targetIndex, 1);
        return _dragList;
      });
    },
    [setDragList, findItem]
  );
  // 渲染控件区
  const renderControlsList = useCallback(function () {
    return controlsList.map(({ text, type }, index) => (
      <DragControlItem {...{ text, type, index }} key={type} />
    ));
  }, []);

  // 渲染可拖拽区域
  const renderDndArea = useCallback(
    () =>
      dragList.map(({ type, id }, index) => (
        <DnDContainer key={id} {...{ type, id, index, moveItem, findItem }}>
          <ButtonController {...{ id, removeControlItem }} />
        </DnDContainer>
      )),
    [dragList, findItem, moveItem, removeControlItem]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.main}>
        <div className={styles.dnd_area}>
          <DropContainer {...{ moveControlItem }}>
            {renderDndArea()}
          </DropContainer>
        </div>
        <div className={styles.controls}>{renderControlsList()}</div>
      </div>
    </DndProvider>
  );
};

export default Home;
