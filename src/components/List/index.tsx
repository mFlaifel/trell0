import { observer } from 'mobx-react';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Item, ListInterface } from '../../interfaces';
import { store } from '../../store';
import { ItemTypes } from '../../utils/dndConstants';
import { AddItem } from '../AddItem';
import CardComponent from '../Card';
import './index.css';

interface Props {
  item: ListInterface;
  boardIndex: number;
  listIndex: number;
}

const ListComponent: FC<Props> = ({ item, boardIndex, listIndex }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.List,
      item: { id: item.id, originalIndex: listIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          // store.moveList(boardIndex, listIndex, droppedId, originalIndex);
          // moveCard(droppedId, originalIndex);
          store.moveList(boardIndex, listIndex, originalIndex);
        }
      },
    }),
    [item.id]
  );

  const [, drop] = useDrop(
    {
      accept: ItemTypes.List,
      hover: (draggedItem: { id: string; originalIndex: number }) => {
        const draggedId = draggedItem.id;
        if (draggedId !== item.id) {
          const sourceListIndexDnd = draggedItem.originalIndex;
          console.log({
            listIndex,
            sourceListIndexDnd: draggedItem.originalIndex,
          });
          store.moveList(boardIndex, sourceListIndexDnd, listIndex);
          // const { index: overIndex } = findCard(id);
          // moveCard(draggedId, overIndex);
        }
      },
    },
    []
  );

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div key={item.id} className='list-container' ref={ref}>
      {item.name}
      {store.boards[boardIndex].lists[listIndex].items.map(
        (item: Item, index: number) => (
          <CardComponent
            item={item}
            index={index}
            key={item.id}
            boardIndex={boardIndex}
            listIndex={listIndex}
          />
        )
      )}
      <AddItem
        text=' + add Card'
        onAdd={(value: string) => {
          store.addCard(boardIndex, listIndex, value);
        }}
      />
    </div>
  );
};

export default observer(ListComponent);
