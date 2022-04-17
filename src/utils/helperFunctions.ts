import { Board, Item, ListInterface } from '../interfaces';

export const findCard = (id: string, items: Item[]) => {
  const item = items.filter((item: Item) => `${item.id}` === id)[0];
  return {
    item,
    index: items.indexOf(item),
  };
};

export const findList = (id: string, lists: ListInterface[]) => {
  const list = lists.filter((list: ListInterface) => `${list.id}` === id)[0];
  return {
    list,
    index: lists.indexOf(list),
  };
};

export const findBoard = (id: string, boards: Board[]) => {
  const board = boards.filter((board: Board) => `${board.id}` === id)[0];
  return {
    board,
    index: boards.indexOf(board),
  };
};

export const _moveListOrBoard = (
  list: any,
  sourceIndex: number,
  destinationIndex: number
) => {
  if (sourceIndex === destinationIndex) return false;
  const tempLists = [...list];
  if (destinationIndex === 0) {
    const [itemToMove] = tempLists.splice(sourceIndex, 1);
    tempLists.unshift(itemToMove);
    return tempLists;
  } else {
    const [itemToMove] = tempLists.splice(sourceIndex, 1);
    tempLists.splice(destinationIndex, 0, itemToMove);
    return tempLists;
  }
};
