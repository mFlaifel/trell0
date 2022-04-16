import { observer } from 'mobx-react';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Item } from '../../interfaces';
import { store } from '../../store';
import { ItemTypes } from '../../utils/dndConstants';
import './index.css';

interface Props {
  item: Item;
  index: number;
  boardIndex: number;
  listIndex: number;
}

const CardComponent: FC<Props> = ({ item, index, boardIndex, listIndex }) => {
  const originalIndex = index;
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Card,
      item: { id: item.id, originalIndex, sourceListIndexDnd: listIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          store.moveItem(boardIndex, listIndex, droppedId, originalIndex);
        }
      },
    }),
    [item.id, originalIndex]
  );

  const [, drop] = useDrop({
    accept: ItemTypes.Card,
    hover: (draggedItem: { id: string; sourceListIndexDnd: number }) => {
      const draggedId = draggedItem.id;
      if (draggedId !== item.id) {
        const sourceListIndexDnd = draggedItem.sourceListIndexDnd;
        // console.log({
        //   listIndex,
        //   sourceListIndexDnd: draggedItem.sourceListIndexDnd,
        // });

        if (sourceListIndexDnd === listIndex) {
          store.moveItem(boardIndex, listIndex, draggedId, originalIndex);
        } else {
          store.moveItemToList(
            boardIndex,
            sourceListIndexDnd,
            listIndex,
            draggedId,
            originalIndex
          );
        }
      }
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      key={item.id}
      className='list-item'
      ref={ref}
      style={{
        opacity,
      }}
    >
      {item.description}
    </div>
  );
};

export default observer(CardComponent);
