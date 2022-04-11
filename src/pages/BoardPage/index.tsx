import './index.css';
import { useParams } from 'react-router-dom';
import { store } from '../../store';
import { AddItem } from '../../components/AddItem';
import { observer } from 'mobx-react';

const BoardPage = () => {
  let boardIndex = parseInt(useParams().boardIndex || '-1');
  let board = store.boards[boardIndex];

  return (
    <div className='board-page-container'>
      <div className='lists-container'>
        {boardIndex !== -1 && board.lists.length !== 0 ? (
          board.lists.map((item, index) => (
            <div key={item.id} className='list-container'>
              {item.name}
              {item.items.map((item) => (
                <div key={item.id} className='card-item'>
                  {item.description}
                </div>
              ))}
              <AddItem
                text=' + add Card'
                onEdit={(value: string) => {
                  store.addCard(boardIndex, index, value);
                }}
              />
            </div>
          ))
        ) : (
          <div>no lists for this board</div>
        )}
        <AddItem
          text=' + add List'
          onEdit={(value: string) => {
            store.addList(boardIndex, value);
          }}
        />
      </div>
    </div>
  );
};
export default observer(BoardPage);
