import Button from 'antd/es/button';
import Input from 'antd/es/input';
import { SetStateAction, useState } from 'react';
import './index.css';

interface Props {
  text: string;
  onAdd: any;
}

export const AddItem: React.FC<Props> = ({ text, onAdd }) => {
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
