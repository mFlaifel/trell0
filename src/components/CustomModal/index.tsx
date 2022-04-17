import './index.css';
import Modal from 'antd/es/modal';
import { FC } from 'react';
import { t } from 'i18next';
import { withTranslation } from 'react-i18next';

interface Props {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
  handleOk: () => void;
  title: string;
}

const CustomModal: FC<Props> = ({
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
        okText={t('OK')}
        cancelText={t('Cancel')}
      >
        {children}
      </Modal>
    </>
  );
};

export default withTranslation()(CustomModal);
