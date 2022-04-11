import Button from 'antd/es/button';
import Input from 'antd/es/input';
import { SetStateAction, useState } from 'react';
import './index.css';

interface Props {
  text: string;
  onEdit: any;
}

export const AddItem: React.FC<Props> = ({ text, onEdit }) => {
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
    onEdit(value);
  };

  return (
    <div onClick={changeEditMode}>
      {isEdit ? (
        <div>
          <Input
            placeholder='Enter list name'
            value={value}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setValue(e.target.value)
            }
          />
          <Button type='primary' onClick={handleAddList}>
            Add List
          </Button>
          <Button type='primary' onClick={handleCancel}>
            cancel
          </Button>
        </div>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};
