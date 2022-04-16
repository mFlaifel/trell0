import { observer } from 'mobx-react';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import { ItemTypes } from '../../utils/dndConstants';
import './index.css';

interface Props {
  index: number;
  name: string;
  id: string;
}

const Board: FC<Props> = ({ index, name, id }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.Board,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      //@ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      //@ts-ignore
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex);
      store.moveBoard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Board,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
      data-handler-id={handlerId}
    >
      <p className='home-board-text'>{name}</p>
    </Link>
  );
};

export default observer(Board);
