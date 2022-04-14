import { useState } from 'react';
import { CustomModal } from '../../components/CustomModal';
import { store } from '../../store';
import Input from 'antd/es/input';
import './index.css';
import { observer } from 'mobx-react';
import { Board } from '../../components/Board';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boardName, setBoardName] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className='home-container'>
      <h1 className='home-workspace'>Your Workspaces</h1>
      <div className='home-board-container'>
        {store.boards.map((board, index) => {
          return (
            <Board index={index} name={board.name} key={index} id={board.id} />
          );
        })}
        <div className='home-board-card home-create-board' onClick={showModal}>
          <p className='home-board-text'>Create new board</p>
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
          title='Create new board'
        >
          <div>
            <Input
              addonBefore='Board name'
              type='text'
              value={boardName}
              placeholder="Type board's name"
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default observer(Home);
