import { useState } from 'react';
import CustomModal from '../../components/CustomModal';
import { store } from '../../store';
import Input from 'antd/es/input';
import './index.css';
import { observer } from 'mobx-react';
import Board from '../../components/Board';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boardName, setBoardName] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <div className='home-container'>
      <h1 className='home-workspace'>{t('Your workspace')}</h1>
      <div className='home-board-container'>
        {store.boards.map((board, index) => {
          return (
            <Board index={index} name={board.name} key={index} id={board.id} />
          );
        })}
        <div className='home-board-card home-create-board' onClick={showModal}>
          <p className='home-board-text'>{t('Create new board')}</p>
        </div>
        <CustomModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleOk={() => {
            if (boardName !== '') {
              setIsModalVisible(false);
              store.addBoard(boardName);
              setBoardName('');
            }
          }}
          title={t('Create new board')}
        >
          <div>
            <Input
              addonBefore={t('Board name')}
              type='text'
              value={boardName}
              placeholder={t("Type board's name")}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default withTranslation()(observer(Home));
