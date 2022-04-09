import './index.css';
import Modal from 'antd/es/modal';
import { FC } from 'react';

interface Props {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
  handleOk: () => void;
  title: string;
}

export const CustomModal: FC<Props> = ({
  setIsModalVisible,
  isModalVisible = false,
  handleOk,
  title = 'Modal',
  children,
}) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};
