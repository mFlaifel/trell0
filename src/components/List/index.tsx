import { t } from 'i18next';
import { observer } from 'mobx-react';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { withTranslation } from 'react-i18next';
import { Item, ListInterface } from '../../interfaces';
import { store } from '../../store';
import { ItemTypes } from '../../utils/dndConstants';
import AddItem from '../AddItem';
import CardComponent from '../Card';
import './index.css';

interface Props {
  item: ListInterface;
  boardIndex: number;
  listIndex: number;
}

const ListComponent: FC<Props> = ({ item, boardIndex, listIndex }) => {
  const ref = useRef(null);
  const originalIndex = listIndex;

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
          store.moveListById(boardIndex, droppedId, originalIndex);
        }
      },
    }),
    [item.id, originalIndex]
  );

  const [, drop] = useDrop({
    accept: [ItemTypes.List],
    hover: (draggedItem: { id: string; originalIndex: number }) => {
      const draggedId = draggedItem.id;
      if (draggedId !== item.id) {
        const sourceListIndexDnd = draggedItem.originalIndex;
        console.log({
          listIndex,
          sourceListIndexDnd,
        });
        store.moveListById(boardIndex, draggedId, listIndex);
      }
    },
  });

  drag(drop(ref));
  const opacity = isDragging ? 0 : 1;

  return (
    <div key={item.id} className='list-container' ref={ref} style={{ opacity }}>
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
        text={t(' + add Card')}
        onAdd={(value: string) => {
          store.addCard(boardIndex, listIndex, value);
        }}
        type='Card'
      />
    </div>
  );
};

export default withTranslation()(observer(ListComponent));
