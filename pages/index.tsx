import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import DnDButton from '@/components/DnDButton';
import DragControlItem from '@/components/DragControlItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useCallback, useState } from 'react';

const strategy = {
  BUTTON: (id: number, index: number) => (
    <DnDButton {...{ id, index }} key={id} />
  ),
};

export type ControlsType = keyof typeof strategy;
export type ControlsItem = { type: ControlsType; text: string };
type ControlsListItem = { type: ControlsType; id: number };

const controlsList: Array<ControlsItem> = [
  { type: 'BUTTON', text: '按钮控件' },
];

const Home: NextPage = () => {
  const [dragList, setDragList] = useState<ControlsListItem[]>([]);
  const renderControlsList = function () {
    return controlsList.map(({ text, type }, index) => (
      <DragControlItem {...{ text, type, index }} key={type} />
    ));
  };
  const renderDragArea = useCallback(
    () => dragList.map(({ type, id }, index) => strategy[type](id, index)),
    [dragList]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.main}>
        <div className={styles.controls}>{renderControlsList()}</div>
        <div className={styles.drag_area}>{renderDragArea()}</div>
      </div>
    </DndProvider>
  );
};

export default Home;
