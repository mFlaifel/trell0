import { makeAutoObservable } from 'mobx';
import { Board } from '../interfaces';
import { initialState } from '../utils/data';
import {
  findCard,
  _moveListOrBoard,
  findList,
  findBoard,
} from '../utils/helperFunctions';
const { v4: uuidv4 } = require('uuid');

class Store {
  boards: Board[] = initialState;
  constructor() {
    makeAutoObservable(this);
  }

  addBoard(name: string) {
    this.boards.push({ name: name, id: uuidv4(), lists: [] });
  }

  addList(boardIndex: number, name: string) {
    this.boards[boardIndex].lists.push({ name: name, id: uuidv4(), items: [] });
  }

  addCard(boardIndex: number, listIndex: number, description: string) {
    this.boards[boardIndex].lists[listIndex].items.push({
      id: uuidv4(),
      description,
      completed: false,
      label: [],
    });
  }

  moveBoard(sourceIndex: number, destinationIndex: number) {
    console.log('sourceIndex', sourceIndex);
    console.log('destinationIndex', destinationIndex);
    if (sourceIndex === destinationIndex) return;
    const tempBoards = [...this.boards];
    const [itemToMove] = tempBoards.splice(sourceIndex, 1);
    tempBoards.splice(destinationIndex, 0, itemToMove);
    this.boards = tempBoards;
  }

  moveBoardById(boardId: string, destinationIndex: number) {
    const { board: sourceList, index: sourceIndex } = findBoard(
      boardId,
      this.boards
    );
    if (sourceIndex === -1) return;
    if (sourceIndex === destinationIndex) return;
    const tempBoards = [...this.boards];
    tempBoards.splice(sourceIndex, 1);
    tempBoards.splice(destinationIndex, 0, sourceList);
    this.boards = tempBoards;
  }

  moveItem(
    boardIndex: number,
    listIndex: number,
    sourceId: string,
    destinationIndex: number
  ) {
    const { item, index } = findCard(
      sourceId,
      this.boards[boardIndex].lists[listIndex].items
    );
    if (index === -1) return;

    const tempItems = [...this.boards[boardIndex].lists[listIndex].items];
    tempItems.splice(index, 1);
    tempItems.splice(destinationIndex, 0, item);
    this.boards[boardIndex].lists[listIndex].items = tempItems;
  }

  moveItemToList(
    boardIndex: number,
    sourceListIndex: number,
    destinationListIndex: number,
    sourceId: string,
    destinationIndex: number
  ) {
    const { item, index } = findCard(
      sourceId,
      this.boards[boardIndex].lists[sourceListIndex].items
    );
    if (index === -1) return;
    const sourceTempItems = [
      ...this.boards[boardIndex].lists[sourceListIndex].items,
    ];
    const destTempItems = [
      ...this.boards[boardIndex].lists[destinationListIndex].items,
    ];
    sourceTempItems.splice(index, 1);
    destTempItems.splice(destinationIndex, 0, item);
    this.boards[boardIndex].lists[sourceListIndex].items = sourceTempItems;
    this.boards[boardIndex].lists[destinationListIndex].items = destTempItems;
  }

  moveList(boardIndex: number, sourceIndex: number, destinationIndex: number) {
    console.log({ sourceIndex, destinationIndex });
    if (sourceIndex === destinationIndex) return;
    const tempLists = _moveListOrBoard(
      [...this.boards[boardIndex].lists],
      sourceIndex,
      destinationIndex
    );
    if (tempLists) {
      this.boards[boardIndex].lists = tempLists;
    } else {
      return;
    }
  }

  moveListById(boardIndex: number, sourceId: string, destinationIndex: number) {
    const { list: sourceList, index: sourceListIndex } = findList(
      sourceId,
      this.boards[boardIndex].lists
    );
    console.log({ sourceListIndex, destinationIndex });
    if (sourceListIndex === -1) return;
    if (sourceListIndex === destinationIndex) return;
    const tempLists = [...this.boards[boardIndex].lists];
    tempLists.splice(sourceListIndex, 1);
    tempLists.splice(destinationIndex, 0, sourceList);
    this.boards[boardIndex].lists = tempLists;
  }
}

export const store = new Store();
