import { useParams } from 'react-router-dom';

export const BoardPage = () => {
  let params = useParams();
  return (
    <div className=''>
      <h1>Board Page {params.boardName}</h1>
    </div>
  );
};
