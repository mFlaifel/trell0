import { observer } from 'mobx-react';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import { ItemTypes } from '../../utils/dndConstants';
import { findBoard } from '../../utils/helperFunctions';
import './index.css';

interface Props {
  index: number;
  name: string;
  id: string;
}

const Board: FC<Props> = ({ index, name, id }) => {
  const ref = useRef(null);
  const originalIndex = findBoard(id, store.boards).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Board,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          store.moveBoardById(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex]
  );

  const [, drop] = useDrop({
    accept: ItemTypes.Board,
    hover: (draggedItem: { id: string }) => {
      const draggedId = draggedItem.id;
      if (draggedId !== id) {
        const overIndex = findBoard(id, store.boards).index;
        store.moveBoardById(draggedId, overIndex);
      }
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <Link
      key={index}
      to={'/board/' + index}
      className='home-board-card'
      ref={ref}
      style={{
        opacity,
      }}
    >
      <p className='home-board-text'>{name}</p>
    </Link>
  );
};

export default observer(Board);
