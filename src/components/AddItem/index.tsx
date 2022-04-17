import Button from 'antd/es/button';
import Input from 'antd/es/input';
import { t } from 'i18next';
import { SetStateAction, useState } from 'react';
import { withTranslation } from 'react-i18next';
import './index.css';

interface Props {
  text: string;
  onAdd: any;
  type?: 'List' | 'Card' | 'Other';
}

const AddItem: React.FC<Props> = ({ text, onAdd, type }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState('');

  const changeEditMode = (e: { stopPropagation: () => void }) => {
    setIsEdit(true);
  };

  const handleCancel = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsEdit(false);
    setValue('');
  };

  const handleAddList = (e: { stopPropagation: () => void }) => {
    handleCancel(e);
    onAdd(value);
  };

  return (
    <div onClick={changeEditMode} className='add-item-container'>
      {isEdit ? (
        <div>
          <Input
            placeholder={t('Type here')}
            value={value}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setValue(e.target.value)
            }
            className='add-item-input'
          />
          <div className='add-item-button-group'>
            <Button type='primary' onClick={handleAddList}>
              {t('Add List')}
            </Button>
            <Button type='primary' onClick={handleCancel}>
              {t('Cancel')}
            </Button>
          </div>
        </div>
      ) : (
        <p
          className={`add-item-text ${
            type === 'List' ? 'add-item-text-list' : ''
          }`}
        >
          {t(text)}
        </p>
      )}
    </div>
  );
};

export default withTranslation()(AddItem);
