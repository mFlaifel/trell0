import './index.css';
import { useParams } from 'react-router-dom';
import { store } from '../../store';
import AddItem from '../../components/AddItem';
import { observer } from 'mobx-react';
import ListComponent from '../../components/List';
import { t } from 'i18next';
import { withTranslation } from 'react-i18next';

const BoardPage = () => {
  let boardIndex = parseInt(useParams().boardIndex || '-1');
  let board = store.boards[boardIndex];

  return (
    <div className='board-page-container'>
      <div className='lists-container'>
        {boardIndex !== -1 && board.lists.length !== 0 ? (
          board.lists.map((item, index) => (
            <ListComponent
              listIndex={index}
              boardIndex={boardIndex}
              item={item}
              key={item.id}
            />
          ))
        ) : (
          <div>{t('no lists for this board')}</div>
        )}
        <AddItem
          text={t(' + add List')}
          onAdd={(value: string) => {
            store.addList(boardIndex, value);
          }}
        />
      </div>
    </div>
  );
};
export default withTranslation()(observer(BoardPage));
