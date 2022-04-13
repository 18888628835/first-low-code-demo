/*
 * @Author: 邱彦兮
 * @Date: 1985-10-26 16:15:00
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-13 20:17:17
 * @FilePath: /first-low-code-demo/pages/index.tsx
 */
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import DnDButton from '@/components/DnDButton';
import DragControlItem from '@/components/DragControlItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useCallback, useState } from 'react';
import DropContainer from '@/components/DropContainer';
import { getUuid } from '@/utils/uuid';

const strategy = {
  BUTTON: (id: number, index: number) => (
    <DnDButton {...{ id, index }} key={id} />
  ),
};

export type ControlsType = keyof typeof strategy;
export type ControlsItem = { type: ControlsType; text: string };
export type DragListItem = { type: ControlsType; id: number };

const controlsList: Array<ControlsItem> = [
  { type: 'BUTTON', text: '按钮控件' },
];

const Home: NextPage = () => {
  const [dragList, setDragList] = useState<DragListItem[]>([]);
  const renderControlsList = function () {
    return controlsList.map(({ text, type }, index) => (
      <DragControlItem {...{ text, type, index }} key={type} />
    ));
  };
  const renderDragArea = useCallback(
    () => dragList.map(({ type, id }, index) => strategy[type](id, index)),
    [dragList]
  );
  function moveControlItem(type: ControlsType) {
    const _dragList = [...dragList, { type, id: getUuid() }];
    setDragList(_dragList);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.main}>
        <div className={styles.controls}>{renderControlsList()}</div>
        <DropContainer {...{ moveControlItem, className: styles.drag_area }}>
          {renderDragArea()}
        </DropContainer>
      </div>
    </DndProvider>
  );
};

export default Home;
