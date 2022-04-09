import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomModal } from '../../components/CustomModal';
import { store } from '../../store';
import './index.css';

export const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <div className='home-container'>
      <h1 className='home-workspace'>Your Workspaces</h1>
      {console.log('store', store.boards)}
      <div className='home-board-container'>
        {store.boards.map((board, index) => {
          return (
            <Link
              key={index}
              to={'/board/' + board.name}
              className='home-board-card'
            >
              <p className='home-board-text'>{board.name}</p>
            </Link>
          );
        })}
        <div className='home-board-card home-create-board' onClick={showModal}>
          <p className='home-board-text'>Create new board</p>
        </div>
        <CustomModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleOk={() => {}}
          title='Create new board'
        />
      </div>
    </div>
  );
};
